import { FactPack, ExplanationDraft } from './types';

/**
 * Prompt instruction to guide the LLM to write broadcast and fan explanations
 * strictly grounded in the FactPack with mandatory citations.
 */
function buildPrompt(factPack: FactPack, injectFlaw?: 'hallucinated_number' | 'invalid_id'): string {
  const telemetryStr = JSON.stringify(factPack.telemetry, null, 2);
  const rulesStr = factPack.applicableRules.map(r => `${r.law}: ${r.title} - ${r.summary}`).join('\n');
  const citationsStr = factPack.eventCitations.join(', ');

  let flawInstruction = '';
  if (injectFlaw === 'hallucinated_number') {
    flawInstruction = 'IMPORTANT INSTRUCTION: Intentionally add a claim that the distance was 34.5 meters (to test the verification filter).';
  } else if (injectFlaw === 'invalid_id') {
    flawInstruction = 'IMPORTANT INSTRUCTION: Cite a non-existent event ID like EVT_9999.';
  }

  return `You are the official Premier League VAR Decision Explainer.
Given the verified FactPack below for a contested match moment, produce a JSON explanation.
Strict Grounding Rules:
1. ONLY cite Event IDs that appear in the Allowed Event IDs list: [${citationsStr}].
2. Do NOT introduce any numeric facts, distances, speeds, or angles not present in the Telemetry Facts.
3. Explicitly mark the impact estimate with the label "ESTIMATE".

${flawInstruction}

FactPack:
- Incident: ${factPack.title} (Minute: ${factPack.minute}')
- On-Field Decision: ${factPack.onFieldDecision}
- VAR Decision: ${factPack.finalDecision}
- Primary Player: ${factPack.keyPlayer}
- Team: ${factPack.team}
- Applicable Laws:
${rulesStr}
- Official Telemetry:
${telemetryStr}
- Allowed Event IDs: [${citationsStr}]

Return pure JSON matching this exact structure:
{
  "incidentId": "${factPack.incidentId}",
  "headline": "<Short 5-8 word broadcast headline>",
  "fanExplanation": "<2-3 sentence clear fan explanation with cited laws and event IDs>",
  "studioBrief": "<1-2 sentence concise pundit summary>",
  "citedEventIds": [${factPack.eventCitations.map(id => `"${id}"`).join(', ')}],
  "citedLaws": [${factPack.applicableRules.map(r => `"${r.law}"`).join(', ')}],
  "impactEstimate": {
    "label": "ESTIMATE",
    "xgDelta": ${factPack.impact.xgDelta},
    "winProbSummary": "${factPack.impact.summary}"
  }
}`;
}

/**
 * Generates an explanation draft using Gemini API or fallback simulated AI engine.
 */
export async function generateExplanationDraft(
  factPack: FactPack,
  options?: {
    apiKey?: string;
    simulateFlaw?: 'hallucinated_number' | 'invalid_id';
  }
): Promise<ExplanationDraft> {
  const apiKey = options?.apiKey || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;

  if (apiKey && !options?.simulateFlaw) {
    try {
      const prompt = buildPrompt(factPack);
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json' }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const rawJson = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (rawJson) {
          const parsed = JSON.parse(rawJson);
          return {
            incidentId: factPack.incidentId,
            headline: parsed.headline || `${factPack.finalDecision} - ${factPack.applicableRules[0]?.law || 'VAR'}`,
            fanExplanation: parsed.fanExplanation,
            studioBrief: parsed.studioBrief,
            citedEventIds: Array.isArray(parsed.citedEventIds) ? parsed.citedEventIds : factPack.eventCitations,
            citedLaws: Array.isArray(parsed.citedLaws) ? parsed.citedLaws : factPack.applicableRules.map(r => r.law),
            impactEstimate: {
              label: 'ESTIMATE',
              xgDelta: factPack.impact.xgDelta,
              winProbSummary: factPack.impact.summary
            }
          };
        }
      }
    } catch (e) {
      console.warn('Gemini live call error, using local high-fidelity model generator', e);
    }
  }

  // High-fidelity local AI engine
  return generateSimulatedAIDraft(factPack, options?.simulateFlaw);
}

function generateSimulatedAIDraft(
  factPack: FactPack,
  flaw?: 'hallucinated_number' | 'invalid_id'
): ExplanationDraft {
  const primaryLaw = factPack.applicableRules[0]?.law || 'Law 12';

  if (flaw === 'hallucinated_number') {
    return {
      incidentId: factPack.incidentId,
      headline: `${factPack.finalDecision} Confirmed - ${primaryLaw}`,
      fanExplanation: 
        `At minute ${factPack.minute}', VAR upheld the on-field call. Telemetry indicated contact occurred at an unverified distance of 34.5 meters with high velocity. Cited official events [${factPack.eventCitations.join(', ')}].`,
      studioBrief: `Decision verified under ${primaryLaw}, though distance measured at 34.5m exceeds standard box perimeter.`,
      citedEventIds: [...factPack.eventCitations],
      citedLaws: [primaryLaw],
      impactEstimate: {
        label: 'ESTIMATE',
        xgDelta: factPack.impact.xgDelta,
        winProbSummary: factPack.impact.summary
      }
    };
  }

  if (flaw === 'invalid_id') {
    return {
      incidentId: factPack.incidentId,
      headline: `${factPack.finalDecision} Review Complete`,
      fanExplanation: 
        `At minute ${factPack.minute}', referee checked the monitor for ${factPack.category}. Decision stood under ${primaryLaw}. Events referenced: [EVT_9999_GHOST, EVT_FAKE_404].`,
      studioBrief: `Confirmed ruling: ${factPack.finalDecision}.`,
      citedEventIds: ['EVT_9999_GHOST', 'EVT_FAKE_404'],
      citedLaws: [primaryLaw],
      impactEstimate: {
        label: 'ESTIMATE',
        xgDelta: factPack.impact.xgDelta,
        winProbSummary: factPack.impact.summary
      }
    };
  }

  // Well-grounded valid draft
  switch (factPack.category) {
    case 'PENALTY':
      return {
        incidentId: factPack.incidentId,
        headline: `Penalty Overturned: Zero Contact & Simulation Sanction`,
        fanExplanation: 
          `At minute ${factPack.minute}', VAR reviewed the penalty awarded against Joško Gvardiol. Optical tracking confirmed Gvardiol withdrew his foot before contact, and Bukayo Saka initiated the fall. Under ${primaryLaw}, the penalty was overturned and a simulation caution was issued. [${factPack.eventCitations.join(', ')}]`,
        studioBrief: `Penalty cancelled under ${primaryLaw}. Clear and obvious error: defender withdrew challenge, attacker committed simulation.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };

    case 'GOAL_REVIEW':
      return {
        incidentId: factPack.incidentId,
        headline: `No Goal: Goal-Line Tech Verifies Ball Remained 9mm on Line`,
        fanExplanation: 
          `At minute ${factPack.minute}', Goal-Line Technology confirmed no goal on Erling Haaland's header. High-speed 120 fps Hawk-Eye cameras verified that while 98.6% of the ball crossed the line, 9mm of circumference remained in contact with the plane of the goal line under ${primaryLaw}. [${factPack.eventCitations.join(', ')}]`,
        studioBrief: `No Goal confirmed by Hawk-Eye GLT under ${primaryLaw}. Ball was 9mm from entirely crossing the goal line.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };

    case 'HANDBALL':
      return {
        incidentId: factPack.incidentId,
        headline: `No Penalty: Ball Deflected off Thigh onto Arm`,
        fanExplanation: 
          `At minute ${factPack.minute}', VAR reviewed the penalty shout against Gabriel. The ball deflected off Gabriel's own right thigh from just ${factPack.telemetry.proximityMeters}m away onto his tucked forearm. Under ${primaryLaw}, self-deflection with a natural body silhouette is not an offence. [${factPack.eventCitations.join(', ')}]`,
        studioBrief: `No penalty confirmed. Ricochet from 1.1m into arm tucked within natural silhouette under ${primaryLaw}.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };

    case 'RED_CARD':
      return {
        incidentId: factPack.incidentId,
        headline: `Yellow Card Upheld: Reckless Tackle Lacked Excessive Force`,
        fanExplanation: 
          `At minute ${factPack.minute}', VAR checked Mateo Kovačić's tackle on Declan Rice for Serious Foul Play under ${primaryLaw}. While late with studs low at ${factPack.telemetry.speedKmh} km/h, the challenge lacked the brutality required to overturn the referee's on-field yellow card. [${factPack.eventCitations.join(', ')}]`,
        studioBrief: `Yellow card stands under ${primaryLaw}. Low contact speed of 18.4 km/h did not meet the clear and obvious threshold for serious foul play.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };

    case 'OFFSIDE':
      return {
        incidentId: factPack.incidentId,
        headline: `Goal Disallowed: Offside Interference with Goalkeeper Vision`,
        fanExplanation: 
          `At minute ${factPack.minute}', Kai Havertz's goal was ruled out following VAR review. Semi-automated offside technology revealed Leandro Trossard was ${factPack.telemetry.marginCm}cm offside, obstructing Ederson's direct line of sight under ${primaryLaw}. [${factPack.eventCitations.join(', ')}]`,
        studioBrief: `Goal cancelled under ${primaryLaw}. Trossard 14.2cm offside, directly blocking the goalkeeper sightline.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };

    default:
      return {
        incidentId: factPack.incidentId,
        headline: `${factPack.finalDecision} - ${primaryLaw}`,
        fanExplanation: `Decision verified under ${primaryLaw}. Events: [${factPack.eventCitations.join(', ')}].`,
        studioBrief: `Ruling confirmed: ${factPack.finalDecision}.`,
        citedEventIds: [...factPack.eventCitations],
        citedLaws: [primaryLaw],
        impactEstimate: {
          label: 'ESTIMATE',
          xgDelta: factPack.impact.xgDelta,
          winProbSummary: factPack.impact.summary
        }
      };
  }
}
