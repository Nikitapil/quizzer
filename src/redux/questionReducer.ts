import { IQuestionState, QuestionAction, QuestionActionsTypes } from "../types/questionTypes"

const initialState: IQuestionState = {
    questions: [],
    score: 0
}


export const questionReducer = (state = initialState, action: QuestionAction) => {
    switch (action.type) {
        case QuestionActionsTypes.LOAD_QUESTIONS: 
            return {...state, questions: action.payload}
        default: 
        return state
    }
}