import { NextRequest, NextResponse } from 'next/server';
import { MATCH_FACT_PACKS } from '@/lib/match-data';
import { generateExplanationDraft } from '@/lib/gemini';
import { runCheckStep } from '@/lib/check-step';
import { ExplanationDraft } from '@/lib/types';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { incidentId, simulateFlaw, customDraft } = body as {
      incidentId: string;
      simulateFlaw?: 'hallucinated_number' | 'invalid_id';
      customDraft?: ExplanationDraft;
    };

    const factPack = MATCH_FACT_PACKS[incidentId];
    if (!factPack) {
      return NextResponse.json({ error: `Incident ${incidentId} not found.` }, { status: 404 });
    }

    // 1. Generate or receive draft
    const draft = customDraft || await generateExplanationDraft(factPack, { simulateFlaw });

    // 2. Execute Check Step Gate
    const checkAudit = runCheckStep(draft, factPack);

    return NextResponse.json({
      success: true,
      incidentId,
      factPack,
      rawDraft: draft,
      checkAudit
    });
  } catch (error) {
    console.error('Error generating explanation:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal Server Error' },
      { status: 500 }
    );
  }
}
