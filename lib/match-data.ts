import { MatchMetadata, MatchEvent, FactPack, KmiRecord } from './types';
import { IFAB_RULES_DATABASE } from './ifab-rules';

export const CURRENT_MATCH: MatchMetadata = {
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
};

export const MATCH_FACT_PACKS: Record<string, FactPack> = {
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
      summary: 'A red card would have swung Arsenal win probability from 42% to 60.5% (approx. +18.5% swing).'
    }
  },
  'INC_68_HANDBALL': {
    incidentId: 'INC_68_HANDBALL',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 42,
    category: 'HANDBALL',
    title: 'Penalty Appeal: Handball Review against Gabriel Magalhães',
    description: 'Phil Foden crosses into the Arsenal penalty box. The ball strikes Gabriel\'s left arm after grazing his right thigh.',
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
      summary: 'A penalty would yield an immediate +0.79 xG chance for Man City, altering win probability by 21.4%.'
    }
  },
  'INC_88_OFFSIDE': {
    incidentId: 'INC_88_OFFSIDE',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 19,
    category: 'OFFSIDE',
    title: 'Disallowed Goal: Offside Interference on Goalkeeper Vision',
    description: 'Kai Havertz scores from 12 yards, but Leandro Trossard is flagged for being in an offside position directly in front of Ederson.',
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
      summary: 'Disallowing the goal reduced Arsenal win probability from 88% back to 56% in the 88th minute.'
    }
  }
};

export const MATCH_TIMELINE_EVENTS: MatchEvent[] = [
  {
    eventId: 'EVT_0101',
    matchId: 'PL-2024-MATCH-842',
    minute: 1,
    second: 0,
    type: 'kickoff',
    team: 'Arsenal',
    player: 'Bukayo Saka',
    coordinates: { x: 50, y: 50 },
    detail: 'First half kicks off at Emirates Stadium.'
  },
  {
    eventId: 'EVT_1204',
    matchId: 'PL-2024-MATCH-842',
    minute: 12,
    second: 24,
    type: 'shot',
    team: 'Manchester City',
    player: 'Erling Haaland',
    coordinates: { x: 18, y: 48 },
    detail: 'Shot blocked by William Saliba inside the six-yard box.'
  },
  {
    eventId: 'EVT_2740',
    matchId: 'PL-2024-MATCH-842',
    minute: 27,
    second: 40,
    type: 'pass',
    team: 'Arsenal',
    player: 'Martin Ødegaard',
    coordinates: { x: 62, y: 34 },
    detail: 'Through ball into the penalty area intercepted by Rúben Dias.'
  },
  // Incident 1: 34' Red Card review
  {
    eventId: 'EVT_3410',
    matchId: 'PL-2024-MATCH-842',
    minute: 34,
    second: 10,
    type: 'pass',
    team: 'Arsenal',
    player: 'Declan Rice',
    coordinates: { x: 48, y: 46 },
    detail: 'Declan Rice turns past midfield carrying the ball forward.'
  },
  {
    eventId: 'EVT_3412',
    matchId: 'PL-2024-MATCH-842',
    minute: 34,
    second: 12,
    type: 'foul',
    team: 'Manchester City',
    player: 'Mateo Kovačić',
    coordinates: { x: 52, y: 45 },
    refereeAction: 'Whistle blown for foul',
    isContested: true,
    incidentId: 'INC_34_RED_CARD',
    detail: 'Kovačić commits late slide tackle from behind onto Rice\'s ankle.'
  },
  {
    eventId: 'EVT_3413',
    matchId: 'PL-2024-MATCH-842',
    minute: 34,
    second: 15,
    type: 'yellow_card',
    team: 'Manchester City',
    player: 'Mateo Kovačić',
    coordinates: { x: 52, y: 45 },
    refereeAction: 'Michael Oliver brandishes Yellow Card',
    isContested: true,
    incidentId: 'INC_34_RED_CARD',
    detail: 'Referee awards yellow card for reckless challenge.'
  },
  {
    eventId: 'EVT_3414',
    matchId: 'PL-2024-MATCH-842',
    minute: 34,
    second: 28,
    type: 'var_review',
    team: 'VAR Hub',
    player: 'Jarred Gillett (VAR)',
    coordinates: { x: 52, y: 45 },
    refereeAction: 'VAR Checking for Potential Red Card',
    isContested: true,
    incidentId: 'INC_34_RED_CARD',
    detail: 'VAR checks contact point, intensity, and studs height for Serious Foul Play.'
  },
  {
    eventId: 'EVT_3415',
    matchId: 'PL-2024-MATCH-842',
    minute: 35,
    second: 12,
    type: 'whistle',
    team: 'Referee',
    player: 'Michael Oliver',
    coordinates: { x: 52, y: 45 },
    refereeAction: 'VAR Check Complete - Yellow Card Confirmed',
    isContested: true,
    incidentId: 'INC_34_RED_CARD',
    detail: 'VAR confirms referee on-field decision; challenge deemed reckless rather than excessive brutality.'
  },
  // Incident 2: 68' Handball penalty shout
  {
    eventId: 'EVT_6808',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 38,
    type: 'pass',
    team: 'Manchester City',
    player: 'Phil Foden',
    coordinates: { x: 22, y: 72 },
    detail: 'Phil Foden drives towards the byline and drills a low cross into the box.'
  },
  {
    eventId: 'EVT_6810',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 41,
    type: 'tackle',
    team: 'Arsenal',
    player: 'Gabriel Magalhães',
    coordinates: { x: 14, y: 56 },
    isContested: true,
    incidentId: 'INC_68_HANDBALL',
    detail: 'Gabriel slides to block cross; ball strikes his upper right thigh from 1.1m.'
  },
  {
    eventId: 'EVT_6811',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 42,
    type: 'handball_appeal',
    team: 'Manchester City',
    player: 'Phil Foden',
    coordinates: { x: 15, y: 58 },
    refereeAction: 'Appeals waved away by Michael Oliver',
    isContested: true,
    incidentId: 'INC_68_HANDBALL',
    detail: 'City players vigorously appeal for handball claiming arm extended.'
  },
  {
    eventId: 'EVT_6812',
    matchId: 'PL-2024-MATCH-842',
    minute: 68,
    second: 43,
    type: 'var_review',
    team: 'Arsenal',
    player: 'Gabriel Magalhães',
    coordinates: { x: 14, y: 56 },
    isContested: true,
    incidentId: 'INC_68_HANDBALL',
    detail: 'Sensor confirms ball caromed off thigh onto left arm tucked close to torso.'
  },
  {
    eventId: 'EVT_6813',
    matchId: 'PL-2024-MATCH-842',
    minute: 69,
    second: 20,
    type: 'whistle',
    team: 'Referee',
    player: 'Michael Oliver',
    coordinates: { x: 14, y: 56 },
    refereeAction: 'VAR Check Complete - No Penalty',
    isContested: true,
    incidentId: 'INC_68_HANDBALL',
    detail: 'VAR confirms arm remained in natural silhouette following self-deflection off thigh.'
  },
  // Incident 3: 88' Offside vision obstruction
  {
    eventId: 'EVT_8818',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 12,
    type: 'shot',
    team: 'Arsenal',
    player: 'Kai Havertz',
    coordinates: { x: 86, y: 52 },
    detail: 'Havertz strikes a crisp low volley into the bottom left corner.'
  },
  {
    eventId: 'EVT_8820',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 15,
    type: 'goal',
    team: 'Arsenal',
    player: 'Kai Havertz',
    coordinates: { x: 98, y: 50 },
    refereeAction: 'Goal signaled by referee',
    isContested: true,
    incidentId: 'INC_88_OFFSIDE',
    detail: 'Ball enters net; Emirates erupts in celebration.'
  },
  {
    eventId: 'EVT_8821',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 19,
    type: 'offside_flag',
    team: 'Match Officials',
    player: 'Stuart Burt (Assistant Referee)',
    coordinates: { x: 92, y: 95 },
    refereeAction: 'Flag raised after delay',
    isContested: true,
    incidentId: 'INC_88_OFFSIDE',
    detail: 'Assistant referee flags Leandro Trossard for offside interference.'
  },
  {
    eventId: 'EVT_8822',
    matchId: 'PL-2024-MATCH-842',
    minute: 88,
    second: 30,
    type: 'var_review',
    team: 'VAR Hub',
    player: 'Jarred Gillett (VAR)',
    coordinates: { x: 89, y: 51 },
    refereeAction: 'Semi-Automated Offside Calibration & Sightline Check',
    isContested: true,
    incidentId: 'INC_88_OFFSIDE',
    detail: 'SAOT lines drawn: Trossard is 14.2cm offside and standing in Ederson\'s direct line of sight.'
  },
  {
    eventId: 'EVT_8823',
    matchId: 'PL-2024-MATCH-842',
    minute: 89,
    second: 45,
    type: 'disallowed_goal',
    team: 'Arsenal',
    player: 'Kai Havertz',
    coordinates: { x: 98, y: 50 },
    refereeAction: 'Goal Disallowed - Offside',
    isContested: true,
    incidentId: 'INC_88_OFFSIDE',
    detail: 'Referee signals indirect free kick to Man City for offside interference.'
  },
  {
    eventId: 'EVT_8824',
    matchId: 'PL-2024-MATCH-842',
    minute: 90,
    second: 0,
    type: 'whistle',
    team: 'Referee',
    player: 'Michael Oliver',
    coordinates: { x: 88, y: 50 },
    detail: 'Match restarts with City free kick.'
  }
];

export const KMI_PANEL_RECORDS: KmiRecord[] = [
  {
    incidentId: 'INC_34_RED_CARD',
    minute: 34,
    category: 'RED_CARD',
    title: 'Mateo Kovačić Challenge on Declan Rice',
    onFieldCall: 'Yellow Card for reckless tackle',
    varRecommendation: 'Check Complete (Yellow Card confirmed)',
    panelVerdict: 'Split 3-2 Verdict',
    panelVotes: {
      inFavor: 3,
      against: 2,
      total: 5
    },
    applicableLaw: 'Law 12.3 (Serious Foul Play vs Reckless Challenge)',
    keyFacts: [
      'Contact was low on boot/Achilles with bent leg reducing full weight transfer.',
      'Speed was 18.4 km/h with no secondary stamping motion.',
      'Two panel members felt the studs exposure warranted a straight red card.'
    ],
    citations: ['EVT_3412', 'EVT_3413', 'EVT_3414', 'EVT_3415'],
    impactEstimate: 'ESTIMATE: A red card would have increased Arsenal win probability by +18.5%.',
    explanation: {
      en: 'The Independent KMI Panel returned a 3-2 split verdict upholding the yellow card. The majority concluded that while the tackle was late and reckless, the lack of full force and leg bend meant the referee did not make a clear and obvious error under Law 12.3.',
      es: 'El Panel Independiente de KMI emitió un veredicto dividido de 3-2 confirmando la tarjeta amarilla. La mayoría consideró que, aunque la entrada fue tardía e imprudente, la flexión de la pierna y la fuerza moderada evitaron que fuera considerada error manifiesto según la Regla 12.3.',
      fr: 'Le panel indépendant du KMI a rendu un verdict partagé (3-2) confirmant le carton jaune. La majorité a estimé que le tacle, bien que dangereux, manquait de brutalité excessive au sens de la Loi 12.3 de l\'IFAB.',
      ar: 'أصدرت لجنة الحالات التحكيمية المستقلة (KMI) قراراً منقسماً بنتيجة 3-2 بتأييد البطاقة الصفراء لكوفاسيتش، حيث رأت الأغلبية أن التدخل كان متهوراً لكنه لم يرتقِ لدرجة القوة المفرطة وفق القانون 12.3.',
      hi: 'स्वतंत्र केएमआई पैनल ने 3-2 के विभाजित फैसले के साथ पीले कार्ड को सही ठहराया। अधिकांश सदस्यों का मानना था कि चुनौती अनुचित थी लेकिन नियम 12.3 के तहत सीधे लाल कार्ड के लिए अत्यधिक बल का अभाव था।'
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
    panelVotes: {
      inFavor: 5,
      against: 0,
      total: 5
    },
    applicableLaw: 'Law 12.1 (Handling the ball - Deflection & Silhouette)',
    keyFacts: [
      'Ball deflected directly off Gabriel\'s own right thigh from 1.1m proximity.',
      'Arm was tucked within the natural body silhouette justifiable by sliding motion.',
      'Unanimous 5-0 panel agreement with on-field and VAR officials.'
    ],
    citations: ['EVT_6810', 'EVT_6811', 'EVT_6812', 'EVT_6813'],
    impactEstimate: 'ESTIMATE: Penalty denial preserved Arsenal 1-goal lead (xG delta: 0.79).',
    explanation: {
      en: 'The Independent KMI Panel voted unanimously (5-0) that no penalty should have been awarded. Under IFAB Law 12.1, when the ball ricochets directly off a player\'s own body onto an arm held in a natural silhouette, it is explicitly not a handball offence.',
      es: 'El Panel de KMI votó por unanimidad (5-0) que no debía señalarse penalti. Según la Regla 12.1 de la IFAB, cuando el balón rebota directamente en el propio cuerpo del jugador hacia un brazo en posición natural, no constituye infracción.',
      fr: 'Le panel du KMI a voté à l\'unanimité (5-0) qu\'il n\'y avait pas de penalty. Conformément à la Loi 12.1 de l\'IFAB, le ballon a d\'abord touché la cuisse du défenseur avant de frapper son bras dans une silhouette naturelle.',
      ar: 'أجمعت لجنة KMI بنسبة 5-0 على صحة قرار عدم احتساب ركلة جزاء. وفق قانون IFAB 12.1، ارتداد الكرة من فخذ اللاعب إلى ذراعه في وضعية طبيعية لا يعد مخالفة لمس يد.',
      hi: 'केएमआई पैनल ने सर्वसम्मति से (5-0) फैसला किया कि यह पेनल्टी नहीं थी। आईएफएबी नियम 12.1 के अनुसार, यदि गेंद खिलाड़ी की जांघ से टकराकर स्वाभाविक स्थिति में हाथ पर लगती है तो यह हैंडबॉल नहीं माना जाता।'
    }
  },
  {
    incidentId: 'INC_88_OFFSIDE',
    minute: 88,
    category: 'OFFSIDE',
    title: 'Leandro Trossard Offside Obstruction on Ederson',
    onFieldCall: 'Goal Awarded (initially by referee)',
    varRecommendation: 'Overturn - Disallow Goal for Offside Interference',
    panelVerdict: 'Correct Call',
    panelVotes: {
      inFavor: 5,
      against: 0,
      total: 5
    },
    applicableLaw: 'Law 11.2 (Interfering with an Opponent\'s Vision)',
    keyFacts: [
      'Semi-automated offside technology confirmed Trossard 14.2cm beyond penultimate defender.',
      'Trossard was standing directly in the central corridor between Havertz\'s shot and Ederson.',
      'Goalkeeper\'s dive was delayed by 0.35s due to obstructed line of sight.'
    ],
    citations: ['EVT_8820', 'EVT_8821', 'EVT_8822', 'EVT_8823', 'EVT_8824'],
    impactEstimate: 'ESTIMATE: Overturned goal prevented Arsenal from sealing a 2-0 victory (-32% win prob delta).',
    explanation: {
      en: 'The Panel supported the VAR intervention unanimously (5-0). Semi-automated lines verified Trossard was 14.2cm offside, and his position directly in front of goalkeeper Ederson obstructed vision under IFAB Law 11.2.',
      es: 'El Panel respaldó unánimemente (5-0) la intervención del VAR. La tecnología semiautomatizada confirmó que Trossard estaba 14.2 cm adelantado y obstruyó la visión del portero según la Regla 11.2.',
      fr: 'Le panel a soutenu à l\'unanimité (5-0) l\'intervention du VAR. Le hors-jeu de 14.2 cm et l\'obstruction du champ de vision d\'Ederson ont été confirmés selon la Loi 11.2.',
      ar: 'أيدت اللجنة بالإجماع (5-0) إلغاء الهدف. تقنية التسلل شبه الآلي أكدت تقدم تروسارد بـ 14.2 سم وحجبه لرؤية الحارس إيدرسون وفق القانون 11.2.',
      hi: 'पैनल ने 5-0 से वीएआर के हस्तक्षेप का समर्थन किया। 14.2 सेमी के ऑफसाइड और गोलकीपर के दृष्टिकोण में बाधा डालने के कारण नियम 11.2 के तहत गोल रद्द करना सही था।'
    }
  }
];
