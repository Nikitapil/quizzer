export enum QuestionActionsTypes {
  LOAD_QUESTIONS = "LOAD_QUESTIONS",
  FETCH_QUESTIONS = "FETCH_QUESTIONS",
  SHOW_QUESTION_LOADER = "SHOW_QUESTION_LOADER",
  SCORE_INCREMENT = "SCORE_INCREMENT",
  SET_QUESTION_ERROR = "SET_QUESTION_ERROR",
}

export interface IQuestion {
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface IQuestionState {
  questions: IQuestion[];
  score: number;
  questionLoading: boolean;
  questionError: boolean;
}

interface ILoadQuestions {
  type: QuestionActionsTypes.LOAD_QUESTIONS;
  payload: IQuestion[];
}

interface IShowQuestionsLoading {
  type: QuestionActionsTypes.SHOW_QUESTION_LOADER;
  payload: boolean;
}

interface IScoreIncrement {
  type: QuestionActionsTypes.SCORE_INCREMENT;
  payload: number;
}
interface ISetQuestionError {
  type: QuestionActionsTypes.SET_QUESTION_ERROR;
}

export type QuestionAction =
  | ILoadQuestions
  | IShowQuestionsLoading
  | IScoreIncrement
  | ISetQuestionError;
