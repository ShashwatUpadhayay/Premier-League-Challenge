import { IFABRuleReference } from './types';

export const IFAB_RULES_DATABASE: Record<string, IFABRuleReference> = {
  LAW_12_HANDBALL_NATURAL: {
    law: 'Law 12.1',
    title: 'Handling the Ball - Body Silhouette & Proximity',
    verbatimClause: 
      'It is an offence if a player touches the ball with their hand/arm when it has made their body unnaturally bigger. A player is not considered to have made their body unnaturally bigger when the position of their hand/arm is a consequence of, or justifiable by, the player’s body movement for that specific situation. Specifically, it is not an offence when the ball touches a player\'s hand/arm directly from the player’s own head, body, or foot.',
    summary: 'No offence if the ball deflects directly off the player\'s own body or if arm is in a natural silhouette justifiable by movement.'
  },
  LAW_12_HANDBALL_DELIBERATE: {
    law: 'Law 12.1',
    title: 'Handling the Ball - Deliberate Touch',
    verbatimClause:
      'It is an offence if a player deliberately touches the ball with their hand/arm, for example moving the hand/arm towards the ball.',
    summary: 'Deliberate motion of hand towards ball is an automatic direct free kick / penalty offence.'
  },
  LAW_12_SERIOUS_FOUL_PLAY: {
    law: 'Law 12.3',
    title: 'Disciplinary Action - Serious Foul Play (Red Card)',
    verbatimClause:
      'A tackle or challenge that endangers the safety of an opponent or uses excessive force or brutality must be sanctioned as serious foul play. Any player who lunges at an opponent in challenging for the ball from the front, from the side or from behind using one or both legs, with excessive force or endangers the safety of an opponent is guilty of serious foul play.',
    summary: 'Excessive force lunging with studs exposed above the ankle constitutes Serious Foul Play (Sending-off offence).'
  },
  LAW_12_RECKLESS_CHALLENGE: {
    law: 'Law 12.3',
    title: 'Disciplinary Action - Reckless Challenge (Yellow Card)',
    verbatimClause:
      'Reckless is when a player acts with disregard to the danger to, or consequences for, an opponent and must be cautioned (yellow card).',
    summary: 'A challenge showing disregard for the opponent without excessive brutal force is a caution (Yellow Card).'
  },
  LAW_11_OFFSIDE_VISION: {
    law: 'Law 11.2',
    title: 'Offside - Interfering with an Opponent',
    verbatimClause:
      'A player in an offside position at the moment the ball is played or touched by a team-mate is only penalised on becoming involved in active play by interfering with play or interfering with an opponent by: preventing an opponent from playing or being able to play the ball by clearly obstructing the opponent’s line of vision or challenging an opponent for the ball.',
    summary: 'A player in offside position obstructing the goalkeeper’s direct line of vision must be penalised for offside.'
  },
  VAR_PROTOCOL_CLEAR_AND_OBVIOUS: {
    law: 'VAR Protocol 1.2',
    title: 'VAR Review Threshold - Clear and Obvious Error',
    verbatimClause:
      'A video assistant referee (VAR) may only assist the referee in the event of a "clear and obvious error" or "serious missed incident" in relation to: Goal/no goal, Penalty/no penalty, Direct red card (not second yellow card), or Mistaken identity.',
    summary: 'VAR intervenes only for clear and obvious errors, not for high-threshold subjective 50/50 judgment calls.'
  }
};
