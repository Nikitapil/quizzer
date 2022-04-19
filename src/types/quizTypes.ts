import { IQuestion } from "./questionTypes"

export enum QuizActionTypes {
    LOAD_USER_QUIZES = 'LOAD_USER_QUIZES',
    FETCH_USER_QUIZES = "FETCH_USER_QUIZES",
    SET_IS_QUIZES_LOADING = "SET_IS_QUIZES_LOADING",
    FETCH_CUSTOM_QUIZ_QUESTIONS = "FETCH_CUSTOM_QUIZ_QUESTIONS",
    LOAD_ALL_QUIZES = "LOAD_ALL_QUIZES",
    FETCH_ALL_QUIZES = "FETCH_ALL_QUIZES"
}

export interface IQuiz {
    id:string,
    quizeName: string,
    questions: IQuestion[],
    idUserQuiz?: string
}

export interface IQuizState {
    userQuizes: IQuiz[],
    quizLoading: boolean,
    allQuizes: IQuiz[]
}
interface ILoadUserQuizes {
    type: QuizActionTypes.LOAD_USER_QUIZES
    payload:IQuiz[];
  }

interface ISetIsQuizLoading {
    type: QuizActionTypes.SET_IS_QUIZES_LOADING
    payload: boolean
}

interface ILoadAllQuizes {
    type: QuizActionTypes.LOAD_ALL_QUIZES
    payload: IQuiz[]
}

export type QuizAction = ILoadUserQuizes | ISetIsQuizLoading | ILoadAllQuizes