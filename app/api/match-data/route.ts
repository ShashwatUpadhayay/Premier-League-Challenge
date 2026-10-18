import { NextResponse } from 'next/server';
import { 
  CURRENT_MATCH, 
  MATCH_TIMELINE_EVENTS, 
  MATCH_FACT_PACKS, 
  KMI_PANEL_RECORDS 
} from '@/lib/match-data';

export async function GET() {
  return NextResponse.json({
    match: CURRENT_MATCH,
    events: MATCH_TIMELINE_EVENTS,
    factPacks: MATCH_FACT_PACKS,
    kmiRecords: KMI_PANEL_RECORDS
  });
}
