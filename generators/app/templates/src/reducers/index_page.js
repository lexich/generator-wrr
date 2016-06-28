import {
  INDEX_PAGE_INCREMENT,
  INDEX_PAGE_DECREMENT
} from "../constants";

export const initialState = {
  score: 100
};


export default {
  [INDEX_PAGE_INCREMENT](state) {
    return { ...state, score: state.score + 1 };
  },
  [INDEX_PAGE_DECREMENT](state) {
    const { score } = state;
    const newScore = score <= 100 ? 100 : score - 1;
    return { ...state, score: newScore };
  }
};
