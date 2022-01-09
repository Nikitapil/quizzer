export enum QuestionActionsTypes {
    LOAD_QUESTIONS = 'LOAD_QUESTIONS',
    FETCH_QUESTIONS = 'FETCH_QUESTIONS'
}


export interface IQuestion {
    question: string;
    correct_answer: string;
    incorrect_answers: string[]
}

export interface IQuestionState {
    questions: IQuestion[]
    score: number
}

interface ILoadQuestions {
    type: QuestionActionsTypes.LOAD_QUESTIONS
    payload: IQuestion[]
}

export type QuestionAction = ILoadQuestions