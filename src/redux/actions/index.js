export const PLAYER = 'PLAYER';
export const SCORE = 'SCORE';
export const EMAIL = 'EMAIL';
export const ASSERTIONS = 'ASSERTIONS';
export const SAVE_DIFFICULTY = 'SAVE_DIFFICULTY';
export const CLEAR_INFOS = 'CLEAR_INFOS';

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

export const addAssertions = (assertions) => ({
  type: ASSERTIONS,
  payload: assertions,
});

export const saveDifficulty = (difficulty) => ({
  type: SAVE_DIFFICULTY,
  payload: difficulty,
});

export const clearInfos = () => ({
  type: CLEAR_INFOS,
});
