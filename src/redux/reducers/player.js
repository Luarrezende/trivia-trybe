import { PLAYER, SCORE, EMAIL } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      player: action.payload,
    };
  case EMAIL:
    return {
      ...state,
      email: action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload + state.score,
    };
  default:
    return state;
  }
};

export default player;
