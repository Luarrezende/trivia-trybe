export const PLAYER = 'PLAYER';
export const SCORE = 'SCORE';
export const EMAIL = 'EMAIL';

export const addPlayer = (player) => ({
  type: PLAYER,
  payload: player,
});

export const addScore = (score) => ({
  type: SCORE,
  payload: score,
});

export const addEmail = (email) => ({
  type: EMAIL,
  payload: email,
});
