import {
  PLAYER,
  SCORE,
  EMAIL,
  ASSERTIONS,
  SAVE_DIFFICULTY,
  ADD_SCORE_POINTS,
} from '../actions';

const INITIAL_STATE = {
  player: '',
  email: '',
  score: 0,
  difficulty: 'medium',
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
  case ASSERTIONS:
    return {
      ...state,
      assertions: action.payload + state.assertions,
    };
  case SAVE_DIFFICULTY:
    return {
      ...state,
      difficulty: action.payload,
    };
  case ADD_SCORE_POINTS:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
};

export default player;
