export type IncidentCategory = 
  | 'HANDBALL' 
  | 'RED_CARD' 
  | 'PENALTY' 
  | 'OFFSIDE' 
  | 'GOAL_REVIEW';

export type EventType =
  | 'kickoff'
  | 'pass'
  | 'tackle'
  | 'shot'
  | 'handball_appeal'
  | 'foul'
  | 'offside_flag'
  | 'var_review'
  | 'whistle'
  | 'yellow_card'
  | 'red_card'
  | 'penalty_awarded'
  | 'goal'
  | 'disallowed_goal';

export interface MatchCoordinates {
  x: number; // 0 to 100 (0 = home goal, 100 = away goal)
  y: number; // 0 to 100 (0 = bottom touchline, 100 = top touchline)
}

export interface MatchEvent {
  eventId: string; // e.g. "EVT_6812"
  matchId: string;
  minute: number;
  second: number;
  type: EventType;
  team: string;
  player: string;
  coordinates: MatchCoordinates;
  refereeAction?: string;
  isContested?: boolean;
  incidentId?: string;
  detail: string;
}

export interface IFABRuleReference {
  law: string; // e.g. "Law 12.1"
  title: string; // "Handling the ball"
  verbatimClause: string;
  summary: string;
}

export interface TelemetryFacts {
  contactPoint?: string;
  ballDeflection?: boolean;
  deflectedFrom?: string;
  proximityMeters?: number;
  speedKmh?: number;
  marginCm?: number;
  armPosition?: 'Natural silhouette' | 'Unnaturally bigger' | 'Supporting body';
  forceLevel?: 'Low' | 'Medium' | 'Excessive' | 'Reckless';
  studsExposed?: boolean;
  offsideLineCoordinates?: {
    attackerX: number;
    defenderX: number;
    deltaCm: number;
  };
}

export interface ImpactFacts {
  xgDelta: number; // e.g. 0.79 for penalty shout
  winProbHomeDelta: number; // e.g. -14.5%
  winProbAwayDelta: number; // e.g. +14.5%
  summary: string;
}

export interface FactPack {
  incidentId: string; // e.g. "INC_68_HANDBALL"
  matchId: string;
  minute: number;
  second: number;
  category: IncidentCategory;
  title: string;
  description: string;
  onFieldDecision: string;
  varReviewStatus: 'Check Complete - No Penalty' | 'Overturn - Red Card' | 'Overturn - Offside' | 'Check Confirmed';
  finalDecision: string;
  keyPlayer: string;
  opponentPlayer?: string;
  team: string;
  coordinates: MatchCoordinates;
  eventCitations: string[]; // List of official Event IDs present in ground truth
  telemetry: TelemetryFacts;
  applicableRules: IFABRuleReference[];
  impact: ImpactFacts;
}

export interface ExplanationDraft {
  incidentId: string;
  headline: string;
  fanExplanation: string;
  studioBrief: string;
  citedEventIds: string[];
  citedLaws: string[];
  impactEstimate: {
    label: 'ESTIMATE';
    xgDelta: number;
    winProbSummary: string;
  };
}

export interface CheckStepAudit {
  status: 'PASSED' | 'FAILED_FALLBACK';
  citedIds: string[];
  validCitations: boolean;
  unrecognizedEventIds: string[];
  hallucinatedFigures: string[];
  hasEstimateLabel: boolean;
  reasons: string[];
  finalExplanation: string;
  finalStudioBrief: string;
  isFallback: boolean;
  timestamp: string;
}

export interface BroadcastGraphic {
  incidentId: string;
  headline: string;
  ruling: string;
  bulletPoints: string[];
  lawCited: string;
  impactTag: string;
  approvedByProducer: boolean;
  approvedAt?: string;
}

export interface KmiRecord {
  incidentId: string;
  minute: number;
  category: IncidentCategory;
  title: string;
  onFieldCall: string;
  varRecommendation: string;
  panelVerdict: 'Correct Call' | 'Incorrect Call - VAR Should Intervene' | 'Split 3-2 Verdict';
  panelVotes: {
    inFavor: number;
    against: number;
    total: number;
  };
  explanation: {
    en: string;
    es: string;
    fr: string;
    ar: string;
    hi: string;
  };
  keyFacts: string[];
  citations: string[];
  impactEstimate: string;
  applicableLaw: string;
}

export interface MatchMetadata {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  stadium: string;
  referee: string;
  varReferee: string;
  competition: string;
  gameweek: number;
  season: string;
  date: string;
}
