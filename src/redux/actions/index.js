export const PLAYER = 'PLAYER';
export const SCORE = 'SCORE';

export const addPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

export const addScore = (score) => ({
  type: SCORE,
  payload: score,
});
