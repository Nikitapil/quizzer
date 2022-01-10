import {
  IQuestionState,
  QuestionAction,
  QuestionActionsTypes,
} from "../types/questionTypes";

const initialState: IQuestionState = {
  questions: [],
  score: 0,
  questionLoading: false,
  questionError: false,
};

export const questionReducer = (
  state = initialState,
  action: QuestionAction
) => {
  switch (action.type) {
    case QuestionActionsTypes.LOAD_QUESTIONS:
      return { ...state, questions: action.payload };
    case QuestionActionsTypes.SHOW_QUESTION_LOADER:
      return { ...state, questionLoading: action.payload };
    case QuestionActionsTypes.SCORE_INCREMENT:
      return { ...state, score: action.payload };
    case QuestionActionsTypes.SET_QUESTION_ERROR:
      return { ...state, questionError: !state.questionError};
    default:
      return state;
  }
};
