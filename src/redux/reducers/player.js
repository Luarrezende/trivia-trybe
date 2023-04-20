import { PLAYER, SCORE, EMAIL } from '../actions';

const INITIAL_STATE = {
  player: '',
  email: '',
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  console.log(action);
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
