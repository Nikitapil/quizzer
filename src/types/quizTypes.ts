import { IQuestion } from "./questionTypes"

export enum QuizActionTypes {
    LOAD_USER_QUIZES = 'LOAD_ALL_QUIZES',
    FETCH_USER_QUIZES = "FETCH_ALL_QUIZES",
    SET_IS_QUIZES_LOADING = "SET_IS_QUIZES_LOADING",
    FETCH_CUSTOM_QUIZ_QUESTIONS = "FETCH_CUSTOM_QUIZ_QUESTIONS"
}

export interface IQuiz {
    id:string,
    quizeName: string,
    questions: IQuestion[]
}

export interface IQuizState {
    userQuizes: IQuiz[],
    quizLoading: boolean
}
interface ILoadUserQuizes {
    type: QuizActionTypes.LOAD_USER_QUIZES
    payload: IQuiz[];
  }

interface ISetIsQuizLoading {
    type: QuizActionTypes.SET_IS_QUIZES_LOADING
    payload: boolean
}

export type QuizAction = ILoadUserQuizes | ISetIsQuizLoading