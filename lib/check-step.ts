import { FactPack, ExplanationDraft, CheckStepAudit } from './types';
import { generateDeterministicFallback } from './template-fallback';

/**
 * Extracts numeric tokens from a text string, ignoring standard punctuation.
 */
function extractNumbers(text: string): number[] {
  // Matches integers and decimals e.g. 1.1, 18.4, 68, 0.79
  const matches = text.match(/\b\d+(\.\d+)?\b/g);
  if (!matches) return [];
  return matches.map(n => parseFloat(n));
}

/**
 * Extracts all allowed numbers from the FactPack that a draft is permitted to mention.
 */
function getAllowedNumbers(factPack: FactPack): Set<number> {
  const allowed = new Set<number>();
  
  // Minute and second
  allowed.add(factPack.minute);
  allowed.add(factPack.second);

  // Telemetry
  if (factPack.telemetry.proximityMeters !== undefined) allowed.add(factPack.telemetry.proximityMeters);
  if (factPack.telemetry.speedKmh !== undefined) allowed.add(factPack.telemetry.speedKmh);
  if (factPack.telemetry.marginCm !== undefined) allowed.add(factPack.telemetry.marginCm);
  if (factPack.telemetry.offsideLineCoordinates) {
    allowed.add(factPack.telemetry.offsideLineCoordinates.attackerX);
    allowed.add(factPack.telemetry.offsideLineCoordinates.defenderX);
    allowed.add(factPack.telemetry.offsideLineCoordinates.deltaCm);
  }

  // Impact
  allowed.add(factPack.impact.xgDelta);
  allowed.add(Math.abs(factPack.impact.winProbHomeDelta));
  allowed.add(Math.abs(factPack.impact.winProbAwayDelta));

  // Applicable Law numbers (e.g., 12.1 -> 12, 1, 12.1; 11.2 -> 11, 2, 11.2)
  factPack.applicableRules.forEach(rule => {
    const lawNums = extractNumbers(rule.law);
    lawNums.forEach(n => allowed.add(n));
  });

  // Extract numbers from event IDs (e.g. EVT_6812 -> 6812)
  factPack.eventCitations.forEach(evt => {
    const digits = evt.replace(/\D/g, '');
    if (digits) allowed.add(parseInt(digits, 10));
  });

  // Common neutral numbers (0, 1, 2, 5 for panel/half)
  allowed.add(0);
  allowed.add(1);
  allowed.add(2);
  allowed.add(3);
  allowed.add(4);
  allowed.add(5);

  return allowed;
}

/**
 * Check Step Gate: Validates an AI draft against ground truth.
 * Falls back deterministically if any rule or figure is violated.
 */
export function runCheckStep(draft: ExplanationDraft, factPack: FactPack): CheckStepAudit {
  const reasons: string[] = [];
  const recognizedSet = new Set(factPack.eventCitations);

  // 1. Citation Validation
  const unrecognizedEventIds: string[] = [];
  if (!draft.citedEventIds || draft.citedEventIds.length === 0) {
    reasons.push('Violation: No official Event IDs cited in draft.');
  } else {
    for (const id of draft.citedEventIds) {
      if (!recognizedSet.has(id)) {
        unrecognizedEventIds.push(id);
      }
    }
    if (unrecognizedEventIds.length > 0) {
      reasons.push(`Violation: Cited non-existent Event IDs [${unrecognizedEventIds.join(', ')}].`);
    }
  }

  const validCitations = unrecognizedEventIds.length === 0 && (draft.citedEventIds?.length ?? 0) > 0;

  // 2. Numerical Grounding (Hallucination Detection)
  const allowedNumbers = getAllowedNumbers(factPack);
  const textToScan = `${draft.fanExplanation} ${draft.studioBrief} ${draft.headline}`;
  const foundNumbers = extractNumbers(textToScan);
  
  const hallucinatedFigures: string[] = [];
  for (const num of foundNumbers) {
    // Check if number is in allowed set or within trivial float tolerance
    let isAllowed = false;
    for (const allowed of allowedNumbers) {
      if (Math.abs(num - allowed) < 0.05) {
        isAllowed = true;
        break;
      }
    }
    if (!isAllowed) {
      hallucinatedFigures.push(`${num}`);
    }
  }

  if (hallucinatedFigures.length > 0) {
    reasons.push(
      `Hallucination Flag: Contains figures [${hallucinatedFigures.join(', ')}] not verified in FactPack telemetry or laws.`
    );
  }

  // 3. Impact Label Check
  const combinedText = `${draft.fanExplanation} ${draft.studioBrief} ${draft.impactEstimate.label}`;
  const hasEstimateLabel = 
    draft.impactEstimate?.label === 'ESTIMATE' && 
    (combinedText.toUpperCase().includes('ESTIMATE') || combinedText.toUpperCase().includes('EST.'));

  if (!hasEstimateLabel) {
    reasons.push('Compliance Warning: Impact step must be explicitly designated as [ESTIMATE].');
  }

  // Final Acceptance Evaluation
  const isAccepted = validCitations && hallucinatedFigures.length === 0 && hasEstimateLabel;

  if (isAccepted) {
    return {
      status: 'PASSED',
      citedIds: draft.citedEventIds,
      validCitations: true,
      unrecognizedEventIds: [],
      hallucinatedFigures: [],
      hasEstimateLabel: true,
      reasons: ['All cited Event IDs verified against ground truth telemetry.', 'Zero unverified numerical claims detected.', 'Impact step verified as [ESTIMATE].'],
      finalExplanation: draft.fanExplanation,
      finalStudioBrief: draft.studioBrief,
      isFallback: false,
      timestamp: new Date().toISOString()
    };
  } else {
    // Fallback to deterministic pre-approved template
    const fallback = generateDeterministicFallback(factPack);
    return {
      status: 'FAILED_FALLBACK',
      citedIds: fallback.citedEventIds,
      validCitations: false,
      unrecognizedEventIds,
      hallucinatedFigures,
      hasEstimateLabel,
      reasons,
      finalExplanation: fallback.fanExplanation,
      finalStudioBrief: fallback.studioBrief,
      isFallback: true,
      timestamp: new Date().toISOString()
    };
  }
}
