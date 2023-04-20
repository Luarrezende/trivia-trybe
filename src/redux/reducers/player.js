import { PLAYER, SCORE, EMAIL, ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  gravatarEmail: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action);
  switch (action.type) {
  case PLAYER:
    return {
      ...state,
      name: action.payload,
    };
  case EMAIL:
    return {
      ...state,
      gravatarEmail: action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.payload + state.score,
    };
  case ASSERTIONS:
    return {
      ...state,
      assertions: action.payload + state.assertions,
    };
  default:
    return state;
  }
};

export default player;
