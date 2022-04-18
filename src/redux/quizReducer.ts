import { IQuizState, QuizAction, QuizActionTypes } from "../types/quizTypes";

const initialState: IQuizState = {
  userQuizes: [],
  quizLoading: false,
};
export const quizReducer = (state = initialState, action: QuizAction) => {
  switch (action.type) {
    case QuizActionTypes.LOAD_USER_QUIZES:
      return { ...state, userQuizes: action.payload };
    case QuizActionTypes.SET_IS_QUIZES_LOADING:
      return { ...state, quizLoading: action.payload };
    default:
      return state;
  }
};
