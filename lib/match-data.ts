import { MatchMetadata, MatchEvent, FactPack, KmiRecord } from './types';
import { IFAB_RULES_DATABASE } from './ifab-rules';

// ==========================================
// 5 PREMIER LEAGUE 2024/25 MARQUEE FIXTURES
// ==========================================

export const PREMIER_LEAGUE_MATCHES: MatchMetadata[] = [
  {
    id: 'PL-2024-MATCH-842',
    homeTeam: 'Arsenal',
    awayTeam: 'Manchester City',
    homeScore: 1,
    awayScore: 0,
    stadium: 'Emirates Stadium, London',
    referee: 'Michael Oliver',
    varReferee: 'Jarred Gillett',
    competition: 'Premier League',
    gameweek: 8,
    season: '2024/25',
    date: '2024-10-08T16:30:00Z'
  },
  {
    id: 'PL-2024-MATCH-501',
    homeTeam: 'Manchester City',
    awayTeam: 'Arsenal',
    homeScore: 2,
    awayScore: 2,
    stadium: 'Etihad Stadium, Manchester',
    referee: 'Michael Oliver',
    varReferee: 'John Brooks',
    competition: 'Premier League',
    gameweek: 5,
    season: '2024/25',
    date: '2024-09-22T15:30:00Z'
  },
  {
    id: 'PL-2024-MATCH-804',
    homeTeam: 'Liverpool',
    awayTeam: 'Chelsea',
    homeScore: 2,
    awayScore: 1,
    stadium: 'Anfield, Liverpool',
    referee: 'John Brooks',
    varReferee: 'Michael Oliver',
    competition: 'Premier League',
    gameweek: 8,
    season: '2024/25',
    date: '2024-10-20T15:30:00Z'
  },
  {
    id: 'PL-2024-MATCH-902',
    homeTeam: 'West Ham United',
    awayTeam: 'Manchester United',
    homeScore: 2,
    awayScore: 1,
    stadium: 'London Stadium, London',
    referee: 'David Coote',
    varReferee: 'Michael Salisbury',
    competition: 'Premier League',
    gameweek: 9,
    season: '2024/25',
    date: '2024-10-27T14:00:00Z'
  },
  {
    id: 'PL-2024-MATCH-603',
    homeTeam: 'Manchester United',
    awayTeam: 'Tottenham Hotspur',
    homeScore: 0,
    awayScore: 3,
    stadium: 'Old Trafford, Manchester',
    referee: 'Chris Kavanagh',
    varReferee: 'Peter Bankes',
    competition: 'Premier League',
    gameweek: 6,
    season: '2024/25',
    date: '2024-09-29T15:30:00Z'
  }
];

export const CURRENT_MATCH: MatchMetadata = PREMIER_LEAGUE_MATCHES[0];

// ==========================================
// MATCH 1: ARSENAL 1 - 0 MANCHESTER CITY
// ==========================================

const M1_FACT_PACKS: Record<string, FactPack> = {
  'INC_14_PENALTY': {
    incidentId: 'INC_14_PENALTY',
    matchId: 'PL-2024-MATCH-842',
    minute: 14,
    second: 22,
    category: 'PENALTY',
    title: 'Penalty Review: Overturned Penalty & Simulation Caution',
    description: 'Bukayo Saka drives into the penalty area and goes down under challenge from Joško Gvardiol. On-field referee points to spot.',
    onFieldDecision: 'Penalty Awarded (On-Field Call)',
    varReviewStatus: 'Overturned - No Foul / Simulation',
    finalDecision: 'Penalty Overturned (Yellow Card Simulation)',
    keyPlayer: 'Bukayo Saka',
    opponentPlayer: 'Joško Gvardiol',
    team: 'Arsenal',
    coordinates: { x: 86, y: 38 },
    eventCitations: ['EVT_1402', 'EVT_1403', 'EVT_1404', 'EVT_1405'],
    telemetry: {
      contactPoint: 'Zero contact from defender boot',
      forceLevel: 'Low',
      proximityMeters: 0.1,
      speedKmh: 24.2
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_12_SIMULATION_UNSPORTING,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: -0.79,
      winProbHomeDelta: -16.4,
      winProbAwayDelta: +16.4,
      summary: 'Overturning the penalty wiped out an expected +0.79 xG goal opportunity for Arsenal.'
    }
  },
  'INC_34_RED_CARD': {
    incidentId: 'INC_34_RED_CARD',
    matchId: 'PL-2024-MATCH-842',
    minute: 34,
    second: 15,
    category: 'RED_CARD',
    title: 'Potential Red Card: Serious Foul Play Review',
    description: 'Mateo Kovačić lunges into Declan Rice in midfield with studs showing around the ankle region.',
    onFieldDecision: 'Yellow Card (Caution)',
    varReviewStatus: 'Check Confirmed',
    finalDecision: 'Yellow Card Upheld (No Red Card)',
    keyPlayer: 'Mateo Kovačić',
    opponentPlayer: 'Declan Rice',
    team: 'Manchester City',
    coordinates: { x: 52, y: 45 },
    eventCitations: ['EVT_3412', 'EVT_3413', 'EVT_3414', 'EVT_3415'],
    telemetry: {
      contactPoint: 'Side of Rice\'s lower Achilles/boot',
      forceLevel: 'Reckless',
      studsExposed: true,
      speedKmh: 18.4,
      proximityMeters: 0.8
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_12_SERIOUS_FOUL_PLAY,
      IFAB_RULES_DATABASE.LAW_12_RECKLESS_CHALLENGE,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.0,
      winProbHomeDelta: +18.5,
      winProbAwayDelta: -18.5,
      summary: 'A red card would have swung Arsenal win probability from 42% to 60.5% (+18.5% swing).'
    }
  },
  'INC_54_GOALLINE': {
    incidentId: 'INC_54_GOALLINE',
    matchId: 'PL-2024-MATCH-842',
    minute: 54,
    second: 8,
    category: 'GOAL_REVIEW',
    title: 'Goal-Line Technology Review: Goal Line Clearance on Haaland Header',
    description: 'Erling Haaland powers a downward header. David Raya claws the ball off the goal line on the bounce.',
    onFieldDecision: 'Play On (No Goal Signal)',
    varReviewStatus: 'Hawk-Eye GLT Confirmed - No Goal',
    finalDecision: 'No Goal Confirmed (9mm on Line)',
    keyPlayer: 'David Raya',
    opponentPlayer: 'Erling Haaland',
    team: 'Arsenal',
    coordinates: { x: 2, y: 32.5 },
    eventCitations: ['EVT_5410', 'EVT_5411', 'EVT_5412', 'EVT_5413'],
    telemetry: {
      contactPoint: 'Raya fingertips on goal-line vertical plane',
      marginCm: 0.9,
      speedKmh: 42.1,
      proximityMeters: 0.0
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_10_GOAL_LINE_TECHNOLOGY,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.68,
      winProbHomeDelta: +24.8,
      winProbAwayDelta: -24.8,
      summary: 'The goal-line save denied City a 0.68 xG equalizer, preserving Arsenal\'s lead.'
    }
  },
  'INC_68_HANDBALL': {
    incidentId: 'INC_68_HANDBALL',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 42,
    category: 'HANDBALL',
    title: 'Penalty Appeal: Handball Review against Gabriel Magalhães',
    description: 'Phil Foden crosses into the penalty box. The ball strikes Gabriel\'s left arm after grazing his right thigh.',
    onFieldDecision: 'Play on (No Penalty)',
    varReviewStatus: 'Check Complete - No Penalty',
    finalDecision: 'No Penalty Confirmed',
    keyPlayer: 'Gabriel Magalhães',
    opponentPlayer: 'Phil Foden',
    team: 'Arsenal',
    coordinates: { x: 14, y: 56 },
    eventCitations: ['EVT_6810', 'EVT_6811', 'EVT_6812', 'EVT_6813'],
    telemetry: {
      contactPoint: 'Left forearm below elbow',
      ballDeflection: true,
      deflectedFrom: 'Right thigh',
      proximityMeters: 1.1,
      armPosition: 'Natural silhouette',
      speedKmh: 68.2
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_12_HANDBALL_NATURAL,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.79,
      winProbHomeDelta: -21.4,
      winProbAwayDelta: +21.4,
      summary: 'A penalty would yield an immediate +0.79 xG chance for Man City.'
    }
  },
  'INC_88_OFFSIDE': {
    incidentId: 'INC_88_OFFSIDE',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 19,
    category: 'OFFSIDE',
    title: 'Disallowed Goal: Offside Interference on Goalkeeper Vision',
    description: 'Kai Havertz scores from 12 yards, but Leandro Trossard is flagged for offside interference on Ederson.',
    onFieldDecision: 'Goal Awarded (Initially)',
    varReviewStatus: 'Overturn - Offside',
    finalDecision: 'Goal Disallowed (Offside Interference)',
    keyPlayer: 'Leandro Trossard',
    opponentPlayer: 'Ederson',
    team: 'Arsenal',
    coordinates: { x: 88, y: 51 },
    eventCitations: ['EVT_8820', 'EVT_8821', 'EVT_8822', 'EVT_8823', 'EVT_8824'],
    telemetry: {
      contactPoint: 'None (Visual obstruction)',
      marginCm: 14.2,
      offsideLineCoordinates: {
        attackerX: 89.2,
        defenderX: 88.8,
        deltaCm: 14.2
      }
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_11_OFFSIDE_VISION,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.88,
      winProbHomeDelta: -32.0,
      winProbAwayDelta: +12.0,
      summary: 'Disallowing the goal reduced Arsenal win probability from 88% back to 56%.'
    }
  }
};

// ==========================================
// MATCH 2: MANCHESTER CITY 2 - 2 ARSENAL
// ==========================================

const M2_FACT_PACKS: Record<string, FactPack> = {
  'INC_MC_22_RESTART': {
    incidentId: 'INC_MC_22_RESTART',
    matchId: 'PL-2024-MATCH-501',
    minute: 22,
    second: 15,
    category: 'GOAL_REVIEW',
    title: 'Riccardo Calafiori Goal: Quick Free-Kick Placement Review',
    description: 'Arsenal take a quick free-kick in midfield while Kyle Walker is called over by referee Oliver. Calafiori scores curling stunner.',
    onFieldDecision: 'Goal Awarded',
    varReviewStatus: 'Check Confirmed - Goal Stands',
    finalDecision: 'Goal Confirmed (Restart Legal)',
    keyPlayer: 'Riccardo Calafiori',
    opponentPlayer: 'Kyle Walker',
    team: 'Arsenal',
    coordinates: { x: 74, y: 35 },
    eventCitations: ['EVT_MC_2201', 'EVT_MC_2202', 'EVT_MC_2203'],
    telemetry: {
      contactPoint: 'Clean left-footed strike from 24.8m',
      proximityMeters: 4.2,
      speedKmh: 94.6
    },
    applicableRules: [
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.04,
      winProbHomeDelta: -28.0,
      winProbAwayDelta: +28.0,
      summary: 'Equalizer swung match momentum; City win probability dropped from 71% to 43%.'
    }
  },
  'INC_MC_45_RED_CARD': {
    incidentId: 'INC_MC_45_RED_CARD',
    matchId: 'PL-2024-MATCH-501',
    minute: 45,
    second: 48,
    category: 'RED_CARD',
    title: 'Leandro Trossard Second Yellow Card: Delaying Restart',
    description: 'Leandro Trossard collides with Bernardo Silva from behind and boots the ball away after the referee\'s whistle.',
    onFieldDecision: 'Second Yellow Card (Red Card Dismissal)',
    varReviewStatus: 'Second Yellow Not Reviewable by VAR Protocol',
    finalDecision: 'Red Card Confirmed (On-Field Protocol)',
    keyPlayer: 'Leandro Trossard',
    opponentPlayer: 'Bernardo Silva',
    team: 'Arsenal',
    coordinates: { x: 48, y: 22 },
    eventCitations: ['EVT_MC_4510', 'EVT_MC_4511', 'EVT_MC_4512'],
    telemetry: {
      contactPoint: 'Silva shoulder-to-back',
      speedKmh: 14.1,
      forceLevel: 'Medium'
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_12_RECKLESS_CHALLENGE,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.0,
      winProbHomeDelta: +36.5,
      winProbAwayDelta: -36.5,
      summary: 'Arsenal down to 10 men for entire 2nd half; City win/draw probability rose to 84%.'
    }
  },
  'INC_MC_98_GOAL': {
    incidentId: 'INC_MC_98_GOAL',
    matchId: 'PL-2024-MATCH-501',
    minute: 98,
    second: 2,
    category: 'GOAL_REVIEW',
    title: 'John Stones 98th-Minute Equalizer: Goal-Line Scramble & Offside Check',
    description: 'Mateo Kovačić shot rebounds inside a crowded 6-yard box. John Stones pokes in the loose ball with Raya surrounded.',
    onFieldDecision: 'Goal Awarded',
    varReviewStatus: 'Check Confirmed - No Impeding',
    finalDecision: 'Goal Awarded (Clean Scramble)',
    keyPlayer: 'John Stones',
    opponentPlayer: 'David Raya',
    team: 'Manchester City',
    coordinates: { x: 97, y: 50 },
    eventCitations: ['EVT_MC_9801', 'EVT_MC_9802', 'EVT_MC_9803'],
    telemetry: {
      contactPoint: 'Right foot poke from 3.2m',
      proximityMeters: 0.6,
      marginCm: 45.0
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_11_OFFSIDE_VISION,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.72,
      winProbHomeDelta: +18.0,
      winProbAwayDelta: -82.0,
      summary: 'Stones 98th-minute goal snatched a 2-2 draw with seconds remaining.'
    }
  }
};

// ==========================================
// MATCH 3: LIVERPOOL 2 - 1 CHELSEA
// ==========================================

const M3_FACT_PACKS: Record<string, FactPack> = {
  'INC_LIV_29_PENALTY': {
    incidentId: 'INC_LIV_29_PENALTY',
    matchId: 'PL-2024-MATCH-804',
    minute: 29,
    second: 10,
    category: 'PENALTY',
    title: 'Penalty Awarded: Levi Colwill Foul on Curtis Jones',
    description: 'Curtis Jones enters the box and Levi Colwill makes clumsy contact from behind. Referee John Brooks awards penalty.',
    onFieldDecision: 'Penalty Awarded',
    varReviewStatus: 'Check Complete - Penalty Confirmed',
    finalDecision: 'Penalty Confirmed (Salah Scored)',
    keyPlayer: 'Curtis Jones',
    opponentPlayer: 'Levi Colwill',
    team: 'Liverpool',
    coordinates: { x: 86, y: 44 },
    eventCitations: ['EVT_LIV_2901', 'EVT_LIV_2902', 'EVT_LIV_2903'],
    telemetry: {
      contactPoint: 'Knee into Jones calf/Achilles',
      forceLevel: 'Medium',
      proximityMeters: 0.2
    },
    applicableRules: [
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.79,
      winProbHomeDelta: +22.0,
      winProbAwayDelta: -22.0,
      summary: 'Penalty converted by Mohamed Salah, establishing 1-0 Liverpool lead.'
    }
  },
  'INC_LIV_45_OVERTURN': {
    incidentId: 'INC_LIV_45_OVERTURN',
    matchId: 'PL-2024-MATCH-804',
    minute: 45,
    second: 50,
    category: 'PENALTY',
    title: 'Penalty Overturned: Robert Sánchez Challenge on Curtis Jones',
    description: 'Jones races onto Darwin Núñez through ball. Goalkeeper Robert Sánchez dives out and referee points to spot for second penalty.',
    onFieldDecision: 'Penalty Awarded (On-Field)',
    varReviewStatus: 'Overturned - Goalkeeper Played Ball Cleanly',
    finalDecision: 'Penalty Overturned (No Foul)',
    keyPlayer: 'Robert Sánchez',
    opponentPlayer: 'Curtis Jones',
    team: 'Chelsea',
    coordinates: { x: 92, y: 52 },
    eventCitations: ['EVT_LIV_4510', 'EVT_LIV_4511', 'EVT_LIV_4512'],
    telemetry: {
      contactPoint: 'Sánchez right glove contacted ball cleanly prior to collision',
      proximityMeters: 0.0,
      speedKmh: 16.2
    },
    applicableRules: [
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: -0.79,
      winProbHomeDelta: -21.0,
      winProbAwayDelta: +21.0,
      summary: 'VAR intervention prevented Chelsea going 2-0 down just before half-time.'
    }
  },
  'INC_LIV_48_SAOT': {
    incidentId: 'INC_LIV_48_SAOT',
    matchId: 'PL-2024-MATCH-804',
    minute: 48,
    second: 20,
    category: 'OFFSIDE',
    title: 'Nicolas Jackson Equalizer: SAOT Semi-Automated Offside Calibration',
    description: 'Nicolas Jackson slots past Kelleher. Assistant referee flags for offside, but SAOT 3D lines are drawn.',
    onFieldDecision: 'Offside Flag (Goal Disallowed On-Field)',
    varReviewStatus: 'Overturned - Player Was Onside',
    finalDecision: 'Goal Awarded (Onside by 3.8cm)',
    keyPlayer: 'Nicolas Jackson',
    opponentPlayer: 'Ibrahima Konaté',
    team: 'Chelsea',
    coordinates: { x: 88, y: 50 },
    eventCitations: ['EVT_LIV_4801', 'EVT_LIV_4802', 'EVT_LIV_4803'],
    telemetry: {
      marginCm: -3.8,
      offsideLineCoordinates: {
        attackerX: 87.8,
        defenderX: 88.2,
        deltaCm: -3.8
      }
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_11_OFFSIDE_VISION,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.62,
      winProbHomeDelta: -26.0,
      winProbAwayDelta: +26.0,
      summary: 'Overturn granted Chelsea 1-1 equalizer early in the second half.'
    }
  }
};

// ==========================================
// MATCH 4: WEST HAM 2 - 1 MANCHESTER UNITED
// ==========================================

const M4_FACT_PACKS: Record<string, FactPack> = {
  'INC_WH_92_PENALTY': {
    incidentId: 'INC_WH_92_PENALTY',
    matchId: 'PL-2024-MATCH-902',
    minute: 92,
    second: 10,
    category: 'PENALTY',
    title: '92nd-Minute Penalty Review: Matthijs de Ligt vs Danny Ings Collision',
    description: 'Danny Ings and Matthijs de Ligt challenge for a loose bouncing ball inside the Manchester United box. Referee David Coote is called to monitor by VAR.',
    onFieldDecision: 'Play On (No Foul on Field)',
    varReviewStatus: 'Referee Called to Monitor - Penalty Awarded',
    finalDecision: 'Penalty Awarded (Bowen Scores 92\')',
    keyPlayer: 'Matthijs de Ligt',
    opponentPlayer: 'Danny Ings',
    team: 'Manchester United',
    coordinates: { x: 12, y: 48 },
    eventCitations: ['EVT_WH_9201', 'EVT_WH_9202', 'EVT_WH_9203', 'EVT_WH_9204'],
    telemetry: {
      contactPoint: 'Lower knee-to-shin mutual impact',
      proximityMeters: 0.3,
      forceLevel: 'Low'
    },
    applicableRules: [
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.79,
      winProbHomeDelta: +64.0,
      winProbAwayDelta: -32.0,
      summary: 'Jarrod Bowen 92nd-minute penalty sealed 2-1 West Ham victory, directly triggering Erik ten Hag\'s dismissal.'
    }
  }
};

// ==========================================
// MATCH 5: MANCHESTER UNITED 0 - 3 TOTTENHAM
// ==========================================

const M5_FACT_PACKS: Record<string, FactPack> = {
  'INC_TOT_03_GOAL': {
    incidentId: 'INC_TOT_03_GOAL',
    matchId: 'PL-2024-MATCH-603',
    minute: 3,
    second: 20,
    category: 'GOAL_REVIEW',
    title: 'Brennan Johnson Tap-In Goal Review (Van de Ven Assist)',
    description: 'Micky van de Ven embarks on a 65-metre run from his own half and crosses for Brennan Johnson to tap into an empty net.',
    onFieldDecision: 'Goal Awarded',
    varReviewStatus: 'Check Confirmed - Goal Stands',
    finalDecision: 'Goal Confirmed',
    keyPlayer: 'Brennan Johnson',
    opponentPlayer: 'André Onana',
    team: 'Tottenham Hotspur',
    coordinates: { x: 96, y: 50 },
    eventCitations: ['EVT_TOT_0301', 'EVT_TOT_0302', 'EVT_TOT_0303'],
    telemetry: {
      contactPoint: 'Right foot tap-in from 3 yards',
      speedKmh: 32.4,
      proximityMeters: 0.8
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_10_GOAL_LINE_TECHNOLOGY,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.88,
      winProbHomeDelta: -28.0,
      winProbAwayDelta: +34.0,
      summary: 'Early Tottenham goal put Manchester United on the back foot from minute 3.'
    }
  },
  'INC_TOT_42_RED_CARD': {
    incidentId: 'INC_TOT_42_RED_CARD',
    matchId: 'PL-2024-MATCH-603',
    minute: 42,
    second: 15,
    category: 'RED_CARD',
    title: 'Bruno Fernandes Straight Red Card on James Maddison',
    description: 'Bruno Fernandes slips while attempting a tackle on Maddison and raises his boot catching Maddison below the knee.',
    onFieldDecision: 'Straight Red Card (Serious Foul Play)',
    varReviewStatus: 'Check Confirmed by VAR (Later Overturned by FA Commission)',
    finalDecision: 'Red Card Confirmed On-Field (SFP)',
    keyPlayer: 'Bruno Fernandes',
    opponentPlayer: 'James Maddison',
    team: 'Manchester United',
    coordinates: { x: 44, y: 62 },
    eventCitations: ['EVT_TOT_4201', 'EVT_TOT_4202', 'EVT_TOT_4203'],
    telemetry: {
      contactPoint: 'Shin pad area below knee',
      speedKmh: 12.3,
      forceLevel: 'Reckless',
      studsExposed: false
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_12_SERIOUS_FOUL_PLAY,
      IFAB_RULES_DATABASE.LAW_12_RECKLESS_CHALLENGE,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.0,
      winProbHomeDelta: -45.0,
      winProbAwayDelta: +45.0,
      summary: 'Man United played with 10 men from 42\', resulting in a 0-3 defeat.'
    }
  },
  'INC_TOT_77_GOAL': {
    incidentId: 'INC_TOT_77_GOAL',
    matchId: 'PL-2024-MATCH-603',
    minute: 77,
    second: 40,
    category: 'GOAL_REVIEW',
    title: 'Dominic Solanke Goal Corner Kick & Flick-On Check',
    description: 'Pape Matar Sarr flicks on a corner kick and Dominic Solanke converts from close range to make it 0-3.',
    onFieldDecision: 'Goal Awarded',
    varReviewStatus: 'Check Confirmed - Goal Stands',
    finalDecision: 'Goal Confirmed (3-0 Spurs)',
    keyPlayer: 'Dominic Solanke',
    opponentPlayer: 'Lisandro Martínez',
    team: 'Tottenham Hotspur',
    coordinates: { x: 95, y: 48 },
    eventCitations: ['EVT_TOT_7701', 'EVT_TOT_7702', 'EVT_TOT_7703'],
    telemetry: {
      contactPoint: 'Right foot sliding finish at back post',
      proximityMeters: 0.5,
      speedKmh: 14.1
    },
    applicableRules: [
      IFAB_RULES_DATABASE.LAW_11_OFFSIDE_VISION,
      IFAB_RULES_DATABASE.VAR_PROTOCOL_CLEAR_AND_OBVIOUS
    ],
    impact: {
      xgDelta: 0.76,
      winProbHomeDelta: -12.0,
      winProbAwayDelta: +12.0,
      summary: 'Solanke third goal sealed the 0-3 victory for Tottenham at Old Trafford.'
    }
  }
};

// ==========================================
// MASTER MATCH DATABASE BUNDLE
// ==========================================

export interface MatchBundle {
  metadata: MatchMetadata;
  factPacks: Record<string, FactPack>;
  timeline: MatchEvent[];
  kmiRecords: KmiRecord[];
}

export const MATCH_DATABASE: Record<string, MatchBundle> = {
  'PL-2024-MATCH-842': {
    metadata: PREMIER_LEAGUE_MATCHES[0],
    factPacks: M1_FACT_PACKS,
    timeline: [
      { eventId: 'EVT_0101', matchId: 'PL-2024-MATCH-842', minute: 1, second: 0, type: 'kickoff', team: 'Arsenal', player: 'Bukayo Saka', coordinates: { x: 50, y: 50 }, detail: 'First half kicks off at Emirates Stadium.' },
      { eventId: 'EVT_1402', matchId: 'PL-2024-MATCH-842', minute: 14, second: 20, type: 'tackle', team: 'Manchester City', player: 'Joško Gvardiol', coordinates: { x: 86, y: 38 }, isContested: true, incidentId: 'INC_14_PENALTY', detail: 'Gvardiol pulls leg back as Saka cuts inside.' },
      { eventId: 'EVT_1403', matchId: 'PL-2024-MATCH-842', minute: 14, second: 22, type: 'penalty_awarded', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 86, y: 38 }, isContested: true, incidentId: 'INC_14_PENALTY', detail: 'Referee awards penalty believing Gvardiol tripped Saka.' },
      { eventId: 'EVT_1404', matchId: 'PL-2024-MATCH-842', minute: 14, second: 45, type: 'var_review', team: 'VAR Hub', player: 'Jarred Gillett (VAR)', coordinates: { x: 86, y: 38 }, isContested: true, incidentId: 'INC_14_PENALTY', detail: 'Optical sensor shows Gvardiol made zero contact; Saka initiated dive.' },
      { eventId: 'EVT_1405', matchId: 'PL-2024-MATCH-842', minute: 16, second: 10, type: 'yellow_card', team: 'Arsenal', player: 'Bukayo Saka', coordinates: { x: 86, y: 38 }, isContested: true, incidentId: 'INC_14_PENALTY', detail: 'Oliver overturns penalty after review and cautions Saka for simulation.' },
      { eventId: 'EVT_3412', matchId: 'PL-2024-MATCH-842', minute: 34, second: 12, type: 'foul', team: 'Manchester City', player: 'Mateo Kovačić', coordinates: { x: 52, y: 45 }, isContested: true, incidentId: 'INC_34_RED_CARD', detail: 'Kovačić commits late slide tackle from behind onto Rice\'s ankle.' },
      { eventId: 'EVT_3413', matchId: 'PL-2024-MATCH-842', minute: 34, second: 15, type: 'yellow_card', team: 'Manchester City', player: 'Mateo Kovačić', coordinates: { x: 52, y: 45 }, isContested: true, incidentId: 'INC_34_RED_CARD', detail: 'Referee awards yellow card for reckless challenge.' },
      { eventId: 'EVT_3414', matchId: 'PL-2024-MATCH-842', minute: 34, second: 28, type: 'var_review', team: 'VAR Hub', player: 'Jarred Gillett (VAR)', coordinates: { x: 52, y: 45 }, isContested: true, incidentId: 'INC_34_RED_CARD', detail: 'VAR checks contact point and force for Serious Foul Play.' },
      { eventId: 'EVT_3415', matchId: 'PL-2024-MATCH-842', minute: 35, second: 12, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 52, y: 45 }, isContested: true, incidentId: 'INC_34_RED_CARD', detail: 'VAR confirms referee on-field decision; yellow card upheld.' },
      { eventId: 'EVT_5410', matchId: 'PL-2024-MATCH-842', minute: 54, second: 6, type: 'shot', team: 'Manchester City', player: 'Erling Haaland', coordinates: { x: 6, y: 35 }, isContested: true, incidentId: 'INC_54_GOALLINE', detail: 'Haaland downward header towards goal line.' },
      { eventId: 'EVT_5411', matchId: 'PL-2024-MATCH-842', minute: 54, second: 8, type: 'tackle', team: 'Arsenal', player: 'David Raya', coordinates: { x: 2, y: 32.5 }, isContested: true, incidentId: 'INC_54_GOALLINE', detail: 'Raya claws ball off the turf right along the white goal line.' },
      { eventId: 'EVT_5412', matchId: 'PL-2024-MATCH-842', minute: 54, second: 15, type: 'var_review', team: 'Hawk-Eye GLT', player: 'Goal-Line Tech', coordinates: { x: 0, y: 32.5 }, isContested: true, incidentId: 'INC_54_GOALLINE', detail: 'Hawk-Eye 3D triangulation confirms 9mm remained on the line.' },
      { eventId: 'EVT_5413', matchId: 'PL-2024-MATCH-842', minute: 54, second: 40, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 4, y: 32.5 }, isContested: true, incidentId: 'INC_54_GOALLINE', detail: 'No goal confirmed; goal kick.' },
      { eventId: 'EVT_6810', matchId: 'PL-2024-MATCH-842', minute: 68, second: 41, type: 'tackle', team: 'Arsenal', player: 'Gabriel Magalhães', coordinates: { x: 14, y: 56 }, isContested: true, incidentId: 'INC_68_HANDBALL', detail: 'Gabriel slides to block cross; ball strikes thigh into arm.' },
      { eventId: 'EVT_6811', matchId: 'PL-2024-MATCH-842', minute: 68, second: 42, type: 'handball_appeal', team: 'Manchester City', player: 'Phil Foden', coordinates: { x: 15, y: 58 }, isContested: true, incidentId: 'INC_68_HANDBALL', detail: 'City players appeal for handball.' },
      { eventId: 'EVT_6812', matchId: 'PL-2024-MATCH-842', minute: 68, second: 43, type: 'var_review', team: 'Arsenal', player: 'Gabriel Magalhães', coordinates: { x: 14, y: 56 }, isContested: true, incidentId: 'INC_68_HANDBALL', detail: 'Sensor confirms ball caromed off thigh onto natural arm silhouette.' },
      { eventId: 'EVT_6813', matchId: 'PL-2024-MATCH-842', minute: 69, second: 20, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 14, y: 56 }, isContested: true, incidentId: 'INC_68_HANDBALL', detail: 'VAR Check Complete - No Penalty.' },
      { eventId: 'EVT_8601', matchId: 'PL-2024-MATCH-842', minute: 86, second: 10, type: 'goal', team: 'Arsenal', player: 'Gabriel Martinelli', coordinates: { x: 82, y: 48 }, detail: 'Martinelli curling strike takes wicked deflection off Aké into the net to win it 1-0.' },
      { eventId: 'EVT_8820', matchId: 'PL-2024-MATCH-842', minute: 88, second: 15, type: 'goal', team: 'Arsenal', player: 'Kai Havertz', coordinates: { x: 98, y: 50 }, isContested: true, incidentId: 'INC_88_OFFSIDE', detail: 'Havertz strikes into the net.' },
      { eventId: 'EVT_8821', matchId: 'PL-2024-MATCH-842', minute: 88, second: 19, type: 'offside_flag', team: 'Match Officials', player: 'Stuart Burt', coordinates: { x: 92, y: 95 }, isContested: true, incidentId: 'INC_88_OFFSIDE', detail: 'Assistant referee flags Leandro Trossard for offside interference.' },
      { eventId: 'EVT_8822', matchId: 'PL-2024-MATCH-842', minute: 88, second: 30, type: 'var_review', team: 'VAR Hub', player: 'Jarred Gillett (VAR)', coordinates: { x: 89, y: 51 }, isContested: true, incidentId: 'INC_88_OFFSIDE', detail: 'SAOT lines drawn: Trossard 14.2cm offside, obstructing Ederson.' },
      { eventId: 'EVT_8823', matchId: 'PL-2024-MATCH-842', minute: 89, second: 45, type: 'disallowed_goal', team: 'Arsenal', player: 'Kai Havertz', coordinates: { x: 98, y: 50 }, isContested: true, incidentId: 'INC_88_OFFSIDE', detail: 'Goal Disallowed for offside interference.' },
      { eventId: 'EVT_9501', matchId: 'PL-2024-MATCH-842', minute: 95, second: 0, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 50, y: 50 }, detail: 'Full-time at Emirates Stadium: Arsenal 1 - 0 Manchester City.' }
    ],
    kmiRecords: [
      {
        incidentId: 'INC_14_PENALTY',
        minute: 14,
        category: 'PENALTY',
        title: 'Bukayo Saka Overturned Penalty & Simulation Caution',
        onFieldCall: 'Penalty Awarded to Arsenal',
        varRecommendation: 'Overturn - No Foul, Simulation Caution',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 12.3 (Simulation & Deception)',
        keyFacts: ['Gvardiol pulled leg back.', 'Saka initiated contact.', 'Zero foul contact confirmed.'],
        citations: ['EVT_1402', 'EVT_1403', 'EVT_1404', 'EVT_1405'],
        impactEstimate: 'ESTIMATE: Overturning penalty denied Arsenal a 0.79 xG opening opportunity.',
        explanation: {
          en: 'The Independent KMI Panel voted unanimously (5-0) that the referee made a clear and obvious error in awarding the penalty. Sensor tracking proved Gvardiol avoided contact, and Saka committed simulation.',
          es: 'El Panel Independiente de KMI votó unánimemente (5-0) que el árbitro cometió un error manifiesto al pitar penalti.',
          fr: 'Le panel indépendant du KMI a voté à l\'unanimité (5-0) que le penalty constituait une erreur manifeste.',
          ar: 'أجمعت لجنة KMI المستقلة بنسبة 5-0 على أن قرار ركلة الجزاء كان خاطئاً بشكل واضح.',
          hi: 'केएमआई पैनल ने 5-0 से सर्वसम्मति से फैसला किया कि पेनल्टी देना स्पष्ट त्रुटि थी।'
        }
      },
      {
        incidentId: 'INC_34_RED_CARD',
        minute: 34,
        category: 'RED_CARD',
        title: 'Mateo Kovačić Challenge on Declan Rice',
        onFieldCall: 'Yellow Card for reckless tackle',
        varRecommendation: 'Check Complete (Yellow Card confirmed)',
        panelVerdict: 'Split 3-2 Verdict',
        panelVotes: { inFavor: 3, against: 2, total: 5 },
        applicableLaw: 'Law 12.3 (Serious Foul Play vs Reckless Challenge)',
        keyFacts: ['Contact low on boot with bent leg.', 'Speed 18.4 km/h.', 'Two panel members felt studs warranted red.'],
        citations: ['EVT_3412', 'EVT_3413', 'EVT_3414', 'EVT_3415'],
        impactEstimate: 'ESTIMATE: A red card would have increased Arsenal win probability by +18.5%.',
        explanation: {
          en: 'The Independent KMI Panel returned a 3-2 split verdict upholding the yellow card.',
          es: 'El Panel Independiente de KMI emitió un veredicto dividido de 3-2 confirmando la tarjeta amarilla.',
          fr: 'Le panel indépendant du KMI a rendu un verdict partagé (3-2) confirmant le carton jaune.',
          ar: 'أصدرت لجنة الحالات التحكيمية المستقلة (KMI) قراراً منقسماً بنتيجة 3-2 بتأييد البطاقة الصفراء.',
          hi: 'स्वतंत्र केएमआई पैनल ने 3-2 के विभाजित फैसले के साथ पीले कार्ड को सही ठहराया।'
        }
      },
      {
        incidentId: 'INC_54_GOALLINE',
        minute: 54,
        category: 'GOAL_REVIEW',
        title: 'David Raya Goal-Line Save on Erling Haaland Header',
        onFieldCall: 'Play On (No Goal Signal)',
        varRecommendation: 'Hawk-Eye GLT Confirmed - No Goal (9mm on line)',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 10.1 (Goal-Line Technology)',
        keyFacts: ['14-camera 3D triangulation at 120 fps.', '9mm of ball remained vertically on the line.'],
        citations: ['EVT_5410', 'EVT_5411', 'EVT_5412', 'EVT_5413'],
        impactEstimate: 'ESTIMATE: Preserved Arsenal clean sheet against a 0.68 xG header.',
        explanation: {
          en: 'The Independent KMI Panel voted unanimously (5-0) in full agreement with the Goal-Line Technology outcome under IFAB Law 10.1.',
          es: 'El Panel de KMI votó unánimemente (5-0) respaldando el veredicto de la tecnología de gol.',
          fr: 'Le panel du KMI a validé à l\'unanimité (5-0) la décision de la Goal-Line Technology.',
          ar: 'أجمعت لجنة KMI بنسبة 5-0 على صحة قرار تكنولوجيا خط المرمى.',
          hi: 'केएमआई पैनल ने सर्वसम्मति से (5-0) गोल-लाइन तकनीक के फैसले का समर्थन किया।'
        }
      },
      {
        incidentId: 'INC_68_HANDBALL',
        minute: 68,
        category: 'HANDBALL',
        title: 'Gabriel Magalhães Handball Penalty Appeal',
        onFieldCall: 'Play On (No Penalty)',
        varRecommendation: 'Check Complete (No Penalty confirmed)',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 12.1 (Handling the ball - Deflection & Silhouette)',
        keyFacts: ['Ball deflected directly off own thigh from 1.1m.', 'Arm tucked in natural silhouette.'],
        citations: ['EVT_6810', 'EVT_6811', 'EVT_6812', 'EVT_6813'],
        impactEstimate: 'ESTIMATE: Penalty denial preserved Arsenal 1-goal lead (xG delta: 0.79).',
        explanation: {
          en: 'The Independent KMI Panel voted unanimously (5-0) that no penalty should have been awarded under IFAB Law 12.1.',
          es: 'El Panel de KMI votó por unanimidad (5-0) que no debía señalarse penalti.',
          fr: 'Le panel du KMI a voté à l\'unanimité (5-0) qu\'il n\'y avait pas de penalty.',
          ar: 'أجمعت لجنة KMI بنسبة 5-0 على صحة قرار عدم احتساب ركلة جزاء.',
          hi: 'केएमआई पैनल ने सर्वसम्मति से (5-0) फैसला किया कि यह पेनल्टी नहीं थी।'
        }
      },
      {
        incidentId: 'INC_88_OFFSIDE',
        minute: 88,
        category: 'OFFSIDE',
        title: 'Leandro Trossard Offside Obstruction on Ederson',
        onFieldCall: 'Goal Awarded (initially)',
        varRecommendation: 'Overturn - Disallow Goal for Offside Interference',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 11.2 (Interfering with an Opponent\'s Vision)',
        keyFacts: ['SAOT verified Trossard 14.2cm offside.', 'Stood in central corridor obstructing vision.'],
        citations: ['EVT_8820', 'EVT_8821', 'EVT_8822', 'EVT_8823', 'EVT_8824'],
        impactEstimate: 'ESTIMATE: Overturned goal prevented Arsenal sealing 2-0 victory.',
        explanation: {
          en: 'The Panel supported the VAR intervention unanimously (5-0) under IFAB Law 11.2.',
          es: 'El Panel respaldó unánimemente (5-0) la intervención del VAR según la Regla 11.2.',
          fr: 'Le panel a soutenu à l\'unanimité (5-0) l\'intervention du VAR.',
          ar: 'أيدت اللجنة بالإجماع (5-0) إلغاء الهدف وفق القانون 11.2.',
          hi: 'पैनल ने 5-0 से वीएआर के हस्तक्षेप का समर्थन किया।'
        }
      }
    ]
  },

  'PL-2024-MATCH-501': {
    metadata: PREMIER_LEAGUE_MATCHES[1],
    factPacks: M2_FACT_PACKS,
    timeline: [
      { eventId: 'EVT_MC_0101', matchId: 'PL-2024-MATCH-501', minute: 1, second: 0, type: 'kickoff', team: 'Manchester City', player: 'Erling Haaland', coordinates: { x: 50, y: 50 }, detail: 'City vs Arsenal kicks off at Etihad Stadium.' },
      { eventId: 'EVT_MC_0901', matchId: 'PL-2024-MATCH-501', minute: 9, second: 15, type: 'goal', team: 'Manchester City', player: 'Erling Haaland', coordinates: { x: 91, y: 48 }, detail: 'Haaland pounces on Savinho through-ball and pokes home his 100th City goal.' },
      { eventId: 'EVT_MC_2201', matchId: 'PL-2024-MATCH-501', minute: 22, second: 10, type: 'pass', team: 'Arsenal', player: 'Thomas Partey', coordinates: { x: 45, y: 35 }, isContested: true, incidentId: 'INC_MC_22_RESTART', detail: 'Quick free kick taken following referee conference with captains.' },
      { eventId: 'EVT_MC_2202', matchId: 'PL-2024-MATCH-501', minute: 22, second: 15, type: 'goal', team: 'Arsenal', player: 'Riccardo Calafiori', coordinates: { x: 74, y: 35 }, isContested: true, incidentId: 'INC_MC_22_RESTART', detail: 'Calafiori bends stunning 25-yard strike into top corner.' },
      { eventId: 'EVT_MC_2203', matchId: 'PL-2024-MATCH-501', minute: 22, second: 45, type: 'var_review', team: 'VAR Hub', player: 'John Brooks (VAR)', coordinates: { x: 50, y: 50 }, isContested: true, incidentId: 'INC_MC_22_RESTART', detail: 'City players protest quick free kick; VAR confirms restart was legal.' },
      { eventId: 'EVT_MC_4501', matchId: 'PL-2024-MATCH-501', minute: 45, second: 12, type: 'goal', team: 'Arsenal', player: 'Gabriel Magalhães', coordinates: { x: 94, y: 52 }, detail: 'Gabriel heads in Saka inswinging corner to put Arsenal 1-2 ahead.' },
      { eventId: 'EVT_MC_4510', matchId: 'PL-2024-MATCH-501', minute: 45, second: 40, type: 'foul', team: 'Arsenal', player: 'Leandro Trossard', coordinates: { x: 48, y: 22 }, isContested: true, incidentId: 'INC_MC_45_RED_CARD', detail: 'Trossard charges into Bernardo Silva in aerial duel.' },
      { eventId: 'EVT_MC_4511', matchId: 'PL-2024-MATCH-501', minute: 45, second: 48, type: 'red_card', team: 'Arsenal', player: 'Leandro Trossard', coordinates: { x: 48, y: 22 }, isContested: true, incidentId: 'INC_MC_45_RED_CARD', detail: 'Michael Oliver shows second yellow card for kicking ball away after whistle.' },
      { eventId: 'EVT_MC_4512', matchId: 'PL-2024-MATCH-501', minute: 46, second: 0, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 48, y: 22 }, isContested: true, incidentId: 'INC_MC_45_RED_CARD', detail: 'Trossard dismissed; Arsenal reduced to 10 men.' },
      { eventId: 'EVT_MC_9801', matchId: 'PL-2024-MATCH-501', minute: 98, second: 0, type: 'shot', team: 'Manchester City', player: 'Mateo Kovačić', coordinates: { x: 92, y: 48 }, isContested: true, incidentId: 'INC_MC_98_GOAL', detail: 'Shot deflects off defenders into the 6-yard box.' },
      { eventId: 'EVT_MC_9802', matchId: 'PL-2024-MATCH-501', minute: 98, second: 2, type: 'goal', team: 'Manchester City', player: 'John Stones', coordinates: { x: 97, y: 50 }, isContested: true, incidentId: 'INC_MC_98_GOAL', detail: 'John Stones bundles home equalizer in the 98th minute.' },
      { eventId: 'EVT_MC_9803', matchId: 'PL-2024-MATCH-501', minute: 98, second: 30, type: 'var_review', team: 'VAR Hub', player: 'John Brooks (VAR)', coordinates: { x: 97, y: 50 }, isContested: true, incidentId: 'INC_MC_98_GOAL', detail: 'VAR checks for blocking on Raya; goal confirmed clean.' },
      { eventId: 'EVT_MC_9901', matchId: 'PL-2024-MATCH-501', minute: 99, second: 0, type: 'whistle', team: 'Referee', player: 'Michael Oliver', coordinates: { x: 50, y: 50 }, detail: 'Full-time: Manchester City 2 - 2 Arsenal.' }
    ],
    kmiRecords: [
      {
        incidentId: 'INC_MC_45_RED_CARD',
        minute: 45,
        category: 'RED_CARD',
        title: 'Leandro Trossard Second Yellow Card Dismissal',
        onFieldCall: 'Second Yellow Card (Red Card Dismissal)',
        varRecommendation: 'Protocol Non-Reviewable (Second Yellow)',
        panelVerdict: 'Split 4-1 Verdict',
        panelVotes: { inFavor: 4, against: 1, total: 5 },
        applicableLaw: 'Law 12.3 (Delaying the Restart of Play)',
        keyFacts: ['Ball booted away 0.84 seconds after whistle.', 'Referee specifically briefed players on delaying restarts.', 'One panelist felt 0.84s was within reasonable reaction time.'],
        citations: ['EVT_MC_4510', 'EVT_MC_4511', 'EVT_MC_4512'],
        impactEstimate: 'ESTIMATE: Dismissal reduced Arsenal 10-man win probability by -36.5%.',
        explanation: {
          en: 'The Independent KMI Panel voted 4-1 supporting Michael Oliver\'s decision. Delaying the restart of play has been subjected to strict PGMOL enforcement under Law 12.3.',
          es: 'El Panel de KMI votó 4-1 respaldando la expulsión de Trossard por retrasar la reanudación del juego.',
          fr: 'Le panel a soutenu à 4-1 le second carton jaune infligé à Trossard pour avoir retardé la reprise.',
          ar: 'صوّتت لجنة KMI بنتيجة 4-1 تأييداً لطرد تروسارد بسبب تأخير استئناف اللعب.',
          hi: 'केएमआई पैनल ने 4-1 के बहुमत से खेल फिर से शुरू करने में देरी के लिए ट्रॉसार्ड के निष्कासन का समर्थन किया।'
        }
      },
      {
        incidentId: 'INC_MC_98_GOAL',
        minute: 98,
        category: 'GOAL_REVIEW',
        title: 'John Stones 98th-Minute Equalizer Review',
        onFieldCall: 'Goal Awarded',
        varRecommendation: 'Check Complete - Goal Stands',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 12 (Impeding Progress Without Contact)',
        keyFacts: ['Akanji did not hold or foul David Raya.', 'Ball was loose inside 6-yard box.'],
        citations: ['EVT_MC_9801', 'EVT_MC_9802', 'EVT_MC_9803'],
        impactEstimate: 'ESTIMATE: 98th minute equalizer salvaged a 2-2 draw for Man City.',
        explanation: {
          en: 'The Panel unanimously agreed (5-0) that Stones\' late goal was valid with no illegal impedance on the goalkeeper.',
          es: 'El Panel acordó por unanimidad (5-0) que el gol tardío de Stones fue completamente válido.',
          fr: 'Le panel a validé à l\'unanimité (5-0) le but de Stones en fin de match.',
          ar: 'أيدت اللجنة بالإجماع (5-0) صحة هدف ستونز المتأخر.',
          hi: 'पैनल ने 5-0 से माना कि स्टोन्स का गोल पूरी तरह से वैध था।'
        }
      }
    ]
  },

  'PL-2024-MATCH-804': {
    metadata: PREMIER_LEAGUE_MATCHES[2],
    factPacks: M3_FACT_PACKS,
    timeline: [
      { eventId: 'EVT_LIV_0101', matchId: 'PL-2024-MATCH-804', minute: 1, second: 0, type: 'kickoff', team: 'Liverpool', player: 'Mohamed Salah', coordinates: { x: 50, y: 50 }, detail: 'Liverpool vs Chelsea kicks off at Anfield.' },
      { eventId: 'EVT_LIV_2901', matchId: 'PL-2024-MATCH-804', minute: 29, second: 5, type: 'tackle', team: 'Chelsea', player: 'Levi Colwill', coordinates: { x: 86, y: 44 }, isContested: true, incidentId: 'INC_LIV_29_PENALTY', detail: 'Colwill kicks through Curtis Jones inside the box.' },
      { eventId: 'EVT_LIV_2902', matchId: 'PL-2024-MATCH-804', minute: 29, second: 10, type: 'penalty_awarded', team: 'Referee', player: 'John Brooks', coordinates: { x: 86, y: 44 }, isContested: true, incidentId: 'INC_LIV_29_PENALTY', detail: 'Referee awards penalty to Liverpool.' },
      { eventId: 'EVT_LIV_2903', matchId: 'PL-2024-MATCH-804', minute: 29, second: 45, type: 'goal', team: 'Liverpool', player: 'Mohamed Salah', coordinates: { x: 89, y: 50 }, isContested: true, incidentId: 'INC_LIV_29_PENALTY', detail: 'Salah converts penalty into the right corner.' },
      { eventId: 'EVT_LIV_4510', matchId: 'PL-2024-MATCH-804', minute: 45, second: 40, type: 'tackle', team: 'Chelsea', player: 'Robert Sánchez', coordinates: { x: 92, y: 52 }, isContested: true, incidentId: 'INC_LIV_45_OVERTURN', detail: 'Sánchez dives out at Jones feet; referee awards penalty.' },
      { eventId: 'EVT_LIV_4511', matchId: 'PL-2024-MATCH-804', minute: 45, second: 50, type: 'var_review', team: 'VAR Hub', player: 'Michael Oliver (VAR)', coordinates: { x: 92, y: 52 }, isContested: true, incidentId: 'INC_LIV_45_OVERTURN', detail: 'VAR shows Sánchez gets clean touch on ball first before Jones collision.' },
      { eventId: 'EVT_LIV_4512', matchId: 'PL-2024-MATCH-804', minute: 46, second: 30, type: 'whistle', team: 'Referee', player: 'John Brooks', coordinates: { x: 92, y: 52 }, isContested: true, incidentId: 'INC_LIV_45_OVERTURN', detail: 'Penalty overturned following pitchside monitor review.' },
      { eventId: 'EVT_LIV_4801', matchId: 'PL-2024-MATCH-804', minute: 48, second: 15, type: 'goal', team: 'Chelsea', player: 'Nicolas Jackson', coordinates: { x: 88, y: 50 }, isContested: true, incidentId: 'INC_LIV_48_SAOT', detail: 'Jackson beats offside trap and finishes cleanly.' },
      { eventId: 'EVT_LIV_4802', matchId: 'PL-2024-MATCH-804', minute: 48, second: 20, type: 'offside_flag', team: 'Match Officials', player: 'Eddie Smart', coordinates: { x: 92, y: 95 }, isContested: true, incidentId: 'INC_LIV_48_SAOT', detail: 'Flag raised for offside against Jackson.' },
      { eventId: 'EVT_LIV_4803', matchId: 'PL-2024-MATCH-804', minute: 49, second: 10, type: 'var_review', team: 'VAR Hub', player: 'Michael Oliver (VAR)', coordinates: { x: 88, y: 50 }, isContested: true, incidentId: 'INC_LIV_48_SAOT', detail: 'SAOT 3D lines confirm Konaté trailing foot played Jackson onside by 3.8cm.' },
      { eventId: 'EVT_LIV_5101', matchId: 'PL-2024-MATCH-804', minute: 51, second: 10, type: 'goal', team: 'Liverpool', player: 'Curtis Jones', coordinates: { x: 94, y: 50 }, detail: 'Salah cross met by Curtis Jones arriving at the back post to restore Liverpool 2-1 lead.' },
      { eventId: 'EVT_LIV_9501', matchId: 'PL-2024-MATCH-804', minute: 95, second: 0, type: 'whistle', team: 'Referee', player: 'John Brooks', coordinates: { x: 50, y: 50 }, detail: 'Full-time whistle: Liverpool 2 - 1 Chelsea.' }
    ],
    kmiRecords: [
      {
        incidentId: 'INC_LIV_45_OVERTURN',
        minute: 45,
        category: 'PENALTY',
        title: 'Robert Sánchez Overturned Penalty on Curtis Jones',
        onFieldCall: 'Penalty Awarded to Liverpool',
        varRecommendation: 'Overturn - Goalkeeper Won Ball Cleanly',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 12 (Careless, Reckless Challenges) & VAR Protocol',
        keyFacts: ['Sánchez made distinct, decisive initial contact on the ball.', 'Jones momentum caused inevitable subsequent collision.'],
        citations: ['EVT_LIV_4510', 'EVT_LIV_4511', 'EVT_LIV_4512'],
        impactEstimate: 'ESTIMATE: Penalty overturn kept Chelsea within 1 goal (-21% win prob delta).',
        explanation: {
          en: 'The Independent KMI Panel unanimously (5-0) supported the VAR overturn. Replays clearly demonstrated Robert Sánchez playing the ball cleanly before contact with Jones occurred.',
          es: 'El Panel de KMI apoyó unánimemente (5-0) la anulación del penalti al comprobar que Sánchez tocó el balón limpiamente.',
          fr: 'Le panel a validé à l\'unanimité (5-0) l\'annulation du penalty, Sánchez ayant touché le ballon en premier.',
          ar: 'أيدت لجنة KMI بالإجماع (5-0) إلغاء ركلة الجزاء للمس الحارس للكرة أولاً.',
          hi: 'केएमआई पैनल ने 5-0 से पेनल्टी रद्द करने का समर्थन किया क्योंकि गोलकीपर ने पहले गेंद को छुआ था।'
        }
      },
      {
        incidentId: 'INC_LIV_48_SAOT',
        minute: 48,
        category: 'OFFSIDE',
        title: 'Nicolas Jackson Equalizer - SAOT Onside Overturn',
        onFieldCall: 'Offside Flag (Goal Disallowed)',
        varRecommendation: 'Overturn - Player Onside by 3.8cm',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 11.1 (Offside Position)',
        keyFacts: ['Konaté boot played Jackson onside.', 'Semi-automated offside technology calibrated accurately.'],
        citations: ['EVT_LIV_4801', 'EVT_LIV_4802', 'EVT_LIV_4803'],
        impactEstimate: 'ESTIMATE: Onside confirmation awarded Chelsea 1-1 equalizer (xG: 0.62).',
        explanation: {
          en: 'The Panel supported the SAOT intervention (5-0). Semi-automated lines verified Jackson was 3.8cm onside, correctly awarding the goal.',
          es: 'El Panel respaldó la intervención semiautomática (5-0), confirmando que Jackson estaba 3.8 cm habilitado.',
          fr: 'Le panel a validé à l\'unanimité (5-0) le but après confirmation SAOT de la position licite de Jackson.',
          ar: 'أيدت اللجنة صحة الهدف بالإجماع (5-0) بعد تأكيد تقنية التسلل شبه الآلي صحة الموقف بـ 3.8 سم.',
          hi: 'पैनल ने 5-0 से गोल को वैध माना क्योंकि तकनीक ने पुष्टि की कि जैक्सन 3.8 सेमी ऑनसाइड था।'
        }
      }
    ]
  },

  'PL-2024-MATCH-902': {
    metadata: PREMIER_LEAGUE_MATCHES[3],
    factPacks: M4_FACT_PACKS,
    timeline: [
      { eventId: 'EVT_WH_0101', matchId: 'PL-2024-MATCH-902', minute: 1, second: 0, type: 'kickoff', team: 'West Ham United', player: 'Michail Antonio', coordinates: { x: 50, y: 50 }, detail: 'West Ham vs Man United kicks off at London Stadium.' },
      { eventId: 'EVT_WH_7401', matchId: 'PL-2024-MATCH-902', minute: 74, second: 12, type: 'goal', team: 'West Ham United', player: 'Crysencio Summerville', coordinates: { x: 94, y: 46 }, detail: 'Summerville slides in at the back post to break the deadlock.' },
      { eventId: 'EVT_WH_8101', matchId: 'PL-2024-MATCH-902', minute: 81, second: 45, type: 'goal', team: 'Manchester United', player: 'Casemiro', coordinates: { x: 92, y: 52 }, detail: 'Casemiro nods home from close range after Zirkzee header to make it 1-1.' },
      { eventId: 'EVT_WH_9201', matchId: 'PL-2024-MATCH-902', minute: 92, second: 5, type: 'tackle', team: 'Manchester United', player: 'Matthijs de Ligt', coordinates: { x: 12, y: 48 }, isContested: true, incidentId: 'INC_WH_92_PENALTY', detail: 'De Ligt challenges Danny Ings for bouncing loose ball.' },
      { eventId: 'EVT_WH_9202', matchId: 'PL-2024-MATCH-902', minute: 92, second: 10, type: 'var_review', team: 'VAR Hub', player: 'Michael Salisbury (VAR)', coordinates: { x: 12, y: 48 }, isContested: true, incidentId: 'INC_WH_92_PENALTY', detail: 'VAR recommends on-field review for potential foul by De Ligt on Ings.' },
      { eventId: 'EVT_WH_9203', matchId: 'PL-2024-MATCH-902', minute: 93, second: 20, type: 'penalty_awarded', team: 'Referee', player: 'David Coote', coordinates: { x: 12, y: 48 }, isContested: true, incidentId: 'INC_WH_92_PENALTY', detail: 'Referee awards penalty after extended monitor review.' },
      { eventId: 'EVT_WH_9204', matchId: 'PL-2024-MATCH-902', minute: 94, second: 30, type: 'goal', team: 'West Ham United', player: 'Jarrod Bowen', coordinates: { x: 89, y: 50 }, isContested: true, incidentId: 'INC_WH_92_PENALTY', detail: 'Jarrod Bowen converts penalty into bottom corner.' },
      { eventId: 'EVT_WH_9801', matchId: 'PL-2024-MATCH-902', minute: 98, second: 0, type: 'whistle', team: 'Referee', player: 'David Coote', coordinates: { x: 50, y: 50 }, detail: 'Full-time: West Ham United 2 - 1 Manchester United.' }
    ],
    kmiRecords: [
      {
        incidentId: 'INC_WH_92_PENALTY',
        minute: 92,
        category: 'PENALTY',
        title: 'Matthijs de Ligt vs Danny Ings Injury-Time Penalty',
        onFieldCall: 'Play On (No Foul Called On-Field)',
        varRecommendation: 'Intervention to Award Penalty (Screen Review)',
        panelVerdict: 'Split 2-3 Incorrect Intervention',
        panelVotes: { inFavor: 2, against: 3, total: 5 },
        applicableLaw: 'Law 12 (Fouls and Misconduct) & VAR Protocol Threshold',
        keyFacts: ['Contact was mutual as both players competed for bouncing ball.', 'Three panel members concluded VAR threshold for clear and obvious error was not met.'],
        citations: ['EVT_WH_9201', 'EVT_WH_9202', 'EVT_WH_9203', 'EVT_WH_9204'],
        impactEstimate: 'ESTIMATE: Penalty awarded 94th minute winner, sealing Ten Hag departure.',
        explanation: {
          en: 'The Independent KMI Panel returned a 3-2 split verdict concluding that the VAR should NOT have intervened, as contact was mutual and did not meet the clear and obvious error threshold.',
          es: 'El Panel de KMI concluyó (3-2) que el VAR NO debió intervenir, ya que el contacto fue mutuo y no constituyó error manifiesto.',
          fr: 'Le panel a conclu (3-2) que le VAR n\'aurait pas dû intervenir dans cette collision mutuelle.',
          ar: 'رأت لجنة KMI بنتيجة 3-2 أن تدخل الـ VAR كان غير صحيح لعدم وجود خطأ واضح وصريح.',
          hi: 'केएमआई पैनल ने 3-2 से फैसला किया कि वीएआर को हस्तक्षेप नहीं करना चाहिए था क्योंकि संपर्क दोनों तरफ से था।'
        }
      }
    ]
  },

  'PL-2024-MATCH-603': {
    metadata: PREMIER_LEAGUE_MATCHES[4],
    factPacks: M5_FACT_PACKS,
    timeline: [
      { eventId: 'EVT_TOT_0101', matchId: 'PL-2024-MATCH-603', minute: 1, second: 0, type: 'kickoff', team: 'Manchester United', player: 'Marcus Rashford', coordinates: { x: 50, y: 50 }, detail: 'Man United vs Tottenham kicks off at Old Trafford.' },
      { eventId: 'EVT_TOT_0301', matchId: 'PL-2024-MATCH-603', minute: 3, second: 12, type: 'pass', team: 'Tottenham Hotspur', player: 'Micky van de Ven', coordinates: { x: 88, y: 35 }, isContested: true, incidentId: 'INC_TOT_03_GOAL', detail: 'Van de Ven surges past three defenders and squares the ball across the face of goal.' },
      { eventId: 'EVT_TOT_0302', matchId: 'PL-2024-MATCH-603', minute: 3, second: 15, type: 'goal', team: 'Tottenham Hotspur', player: 'Brennan Johnson', coordinates: { x: 96, y: 50 }, isContested: true, incidentId: 'INC_TOT_03_GOAL', detail: 'Johnson slots in at the far post to give Tottenham an early 1-0 lead.' },
      { eventId: 'EVT_TOT_0303', matchId: 'PL-2024-MATCH-603', minute: 3, second: 45, type: 'var_review', team: 'VAR Hub', player: 'Peter Bankes (VAR)', coordinates: { x: 96, y: 50 }, isContested: true, incidentId: 'INC_TOT_03_GOAL', detail: 'VAR check confirms onside and ball remained in play; goal confirmed.' },
      { eventId: 'EVT_TOT_4201', matchId: 'PL-2024-MATCH-603', minute: 42, second: 10, type: 'foul', team: 'Manchester United', player: 'Bruno Fernandes', coordinates: { x: 44, y: 62 }, isContested: true, incidentId: 'INC_TOT_42_RED_CARD', detail: 'Fernandes slips and catches Maddison on the shin.' },
      { eventId: 'EVT_TOT_4202', matchId: 'PL-2024-MATCH-603', minute: 42, second: 15, type: 'red_card', team: 'Referee', player: 'Chris Kavanagh', coordinates: { x: 44, y: 62 }, isContested: true, incidentId: 'INC_TOT_42_RED_CARD', detail: 'Referee brandishes straight red card for Serious Foul Play.' },
      { eventId: 'EVT_TOT_4203', matchId: 'PL-2024-MATCH-603', minute: 42, second: 45, type: 'var_review', team: 'VAR Hub', player: 'Peter Bankes (VAR)', coordinates: { x: 44, y: 62 }, isContested: true, incidentId: 'INC_TOT_42_RED_CARD', detail: 'VAR check confirms on-field decision (subsequently overturned on FA Appeal).' },
      { eventId: 'EVT_TOT_4701', matchId: 'PL-2024-MATCH-603', minute: 47, second: 20, type: 'goal', team: 'Tottenham Hotspur', player: 'Dejan Kulusevski', coordinates: { x: 92, y: 46 }, detail: 'Kulusevski acrobatically flicks Johnson deflected cross over Onana to make it 0-2.' },
      { eventId: 'EVT_TOT_7701', matchId: 'PL-2024-MATCH-603', minute: 77, second: 30, type: 'corner_kick', team: 'Tottenham Hotspur', player: 'Lucas Bergvall', coordinates: { x: 100, y: 100 }, isContested: true, incidentId: 'INC_TOT_77_GOAL', detail: 'Inswinging corner delivered to the front post.' },
      { eventId: 'EVT_TOT_7702', matchId: 'PL-2024-MATCH-603', minute: 77, second: 32, type: 'header', team: 'Tottenham Hotspur', player: 'Pape Matar Sarr', coordinates: { x: 92, y: 55 }, isContested: true, incidentId: 'INC_TOT_77_GOAL', detail: 'Sarr glances header towards the back post.' },
      { eventId: 'EVT_TOT_7703', matchId: 'PL-2024-MATCH-603', minute: 77, second: 35, type: 'goal', team: 'Tottenham Hotspur', player: 'Dominic Solanke', coordinates: { x: 96, y: 48 }, isContested: true, incidentId: 'INC_TOT_77_GOAL', detail: 'Solanke pounces from close range to make it 0-3.' },
      { eventId: 'EVT_TOT_9001', matchId: 'PL-2024-MATCH-603', minute: 90, second: 0, type: 'whistle', team: 'Referee', player: 'Chris Kavanagh', coordinates: { x: 50, y: 50 }, detail: 'Full-time at Old Trafford: Manchester United 0 - 3 Tottenham Hotspur.' }
    ],
    kmiRecords: [
      {
        incidentId: 'INC_TOT_03_GOAL',
        minute: 3,
        category: 'GOAL_REVIEW',
        title: 'Brennan Johnson Goal Confirmation',
        onFieldCall: 'Goal Awarded',
        varRecommendation: 'Check Complete - Goal Confirmed',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 10 (Determining the Outcome) & Law 11 (Offside)',
        keyFacts: ['Van de Ven kept ball in play before byline cross.', 'Johnson was onside at moment of pass.'],
        citations: ['EVT_TOT_0301', 'EVT_TOT_0302', 'EVT_TOT_0303'],
        impactEstimate: 'ESTIMATE: Early goal shifted Tottenham win expectancy to 68%.',
        explanation: {
          en: 'The Independent KMI Panel unanimously agreed (5-0) that Brennan Johnson\'s opening goal was legal in all respects.',
          es: 'El Panel de KMI acordó por unanimidad (5-0) que el gol de Johnson fue completamente válido.',
          fr: 'Le panel a validé à l\'unanimité (5-0) le premier but de Johnson.',
          ar: 'أيدت اللجنة بالإجماع (5-0) صحة هدف جونسون المبكر.',
          hi: 'पैनल ने 5-0 से माना कि जॉनसन का गोल पूरी तरह से वैध था।'
        }
      },
      {
        incidentId: 'INC_TOT_42_RED_CARD',
        minute: 42,
        category: 'RED_CARD',
        title: 'Bruno Fernandes Straight Red Card on James Maddison',
        onFieldCall: 'Straight Red Card (Serious Foul Play)',
        varRecommendation: 'Check Complete (Red Card Confirmed by VAR)',
        panelVerdict: 'Split 1-4 Incorrect Decision',
        panelVotes: { inFavor: 1, against: 4, total: 5 },
        applicableLaw: 'Law 12.3 (Serious Foul Play vs Reckless Challenge)',
        keyFacts: ['Fernandes slipped prior to making contact.', 'Contact was made with side of boot/shin, not leading studs.', 'FA Independent Regulatory Commission formally rescinded the 3-match ban upon appeal.'],
        citations: ['EVT_TOT_4201', 'EVT_TOT_4202', 'EVT_TOT_4203'],
        impactEstimate: 'ESTIMATE: Red card reduced Man United win probability by -45% in 0-3 loss.',
        explanation: {
          en: 'The Independent KMI Panel voted 4-1 that the red card was an INCORRECT decision. Fernandes slipped and made low-intensity contact with the side of his foot rather than studs, warranting a yellow card for reckless play.',
          es: 'El Panel de KMI votó 4-1 que la tarjeta roja fue INCORRECTA. El resbalón de Fernandes y el contacto lateral correspondían a tarjeta amarilla.',
          fr: 'Le panel a voté à 4-1 que le carton rouge était INCORRECT, le contact résultant d\'une glissade.',
          ar: 'قررت لجنة KMI بنتيجة 4-1 أن البطاقة الحمراء كانت قراراً خاطئاً، حيث انزلق اللاعب واستحق بطاقة صفراء فقط.',
          hi: 'केएमआई पैनल ने 4-1 से माना कि लाल कार्ड गलत फैसला था क्योंकि फर्नांडीस फिसल गए थे और केवल पीला कार्ड दिया जाना चाहिए था।'
        }
      },
      {
        incidentId: 'INC_TOT_77_GOAL',
        minute: 77,
        category: 'GOAL_REVIEW',
        title: 'Dominic Solanke Goal - Corner Kick Onside Check',
        onFieldCall: 'Goal Awarded',
        varRecommendation: 'Check Complete - Goal Stands',
        panelVerdict: 'Correct Call',
        panelVotes: { inFavor: 5, against: 0, total: 5 },
        applicableLaw: 'Law 11 (Offside - Flick on Position)',
        keyFacts: ['Solanke was behind ball level when Sarr flicked on header.', 'No foul in penalty box cluster.'],
        citations: ['EVT_TOT_7701', 'EVT_TOT_7702', 'EVT_TOT_7703'],
        impactEstimate: 'ESTIMATE: 3rd goal confirmed 0-3 result at Old Trafford.',
        explanation: {
          en: 'The Independent KMI Panel unanimously agreed (5-0) that Solanke was onside on the flick-on and the goal was properly awarded.',
          es: 'El Panel de KMI confirmó por unanimidad (5-0) que Solanke estaba habilitado en la prolongación del córner.',
          fr: 'Le panel a confirmé à l\'unanimité (5-0) la position licite de Solanke sur le corner.',
          ar: 'أيدت اللجنة بالإجماع (5-0) صحة هدف سولانكي من الركنية.',
          hi: 'केएमआई पैनल ने 5-0 से पुष्टि की कि फ्लिक-ऑन पर सोलंके ऑनसाइड थे और गोल वैध था।'
        }
      }
    ]
  }
};

// ==========================================
// ALL FACT PACKS (COMBINED FOR FAST LOOKUP)
// ==========================================

export const ALL_FACT_PACKS: Record<string, FactPack> = {
  ...M1_FACT_PACKS,
  ...M2_FACT_PACKS,
  ...M3_FACT_PACKS,
  ...M4_FACT_PACKS,
  ...M5_FACT_PACKS
};

// Default backwards compatibility
export const MATCH_FACT_PACKS: Record<string, FactPack> = ALL_FACT_PACKS;
export const MATCH_TIMELINE_EVENTS: MatchEvent[] = MATCH_DATABASE['PL-2024-MATCH-842'].timeline;
export const KMI_PANEL_RECORDS: KmiRecord[] = MATCH_DATABASE['PL-2024-MATCH-842'].kmiRecords;
