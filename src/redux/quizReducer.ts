import { IQuizState, QuizAction, QuizActionTypes } from "../types/quizTypes";

const initialState: IQuizState = {
  userQuizes: [],
  quizLoading: false,
  allQuizes: [],
};
export const quizReducer = (state = initialState, action: QuizAction) => {
  switch (action.type) {
    case QuizActionTypes.LOAD_USER_QUIZES:
      return { ...state, userQuizes: action.payload };
    case QuizActionTypes.SET_IS_QUIZES_LOADING:
      return { ...state, quizLoading: action.payload };
    case QuizActionTypes.LOAD_ALL_QUIZES:
      return { ...state, allQuizes: action.payload };
    default:
      return state;
  }
};
