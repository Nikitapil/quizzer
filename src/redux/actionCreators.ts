import { QuestionAction, QuestionActionsTypes } from './../types/questionTypes';
import { IQuestion } from '../types/questionTypes';
import { MainActions, MainActionTypes, IOption, IQuestionCount } from './../types/mainTypes';
import { UserActionstypes } from '../types/userTypes';
import { IQuiz, QuizActionTypes } from '../types/quizTypes';

//Main actions

export const setDifficulty = (payload: string): MainActions => {
    return {
        type: MainActionTypes.SET_DIFFICULTY,
        payload
    }
}

export const setType= (payload: string): MainActions => {
    return {
        type: MainActionTypes.SET_TYPE,
        payload
    }
}

export const setCategories= (payload: string): MainActions => {
    return {
        type: MainActionTypes.SET_CATEGORIES,
        payload
    }
}

export const loadCategories= (payload: IOption[]): MainActions => {
    return {
        type: MainActionTypes.LOAD_CATEGORIES,
        payload
    }
}

export const showCategoriesloading= (payload: boolean): MainActions => {
    return {
        type: MainActionTypes.SHOW_CATEGORIES_LOADER,
        payload
    }
}

export const setQuestionAmount = (payload: IQuestionCount): MainActions => {
    return {
        type: MainActionTypes.SET_QUESTION_AMOUNT,
        payload
    }
}

export const changeQuestionAmount = (payload: string): MainActions => {
    return {
        type: MainActionTypes.CHANGE_QUESTION_AMOUNT,
        payload
    }
}

export const setCategoriesError= ()  => {
    return {
        type: MainActionTypes.SET_CATEGORIES_ERROR,
    }
}

export const fetchCategories= ()  => {
    return {
        type: MainActionTypes.FETCH_CATEGORIES,
    }
}

// QuestionActions

export const loadQuestions = (payload: IQuestion[]): QuestionAction => {
    return {
        type: QuestionActionsTypes.LOAD_QUESTIONS,
        payload
    }
}

export const showQuestionLoader = (payload: boolean): QuestionAction => {
    return {
        type: QuestionActionsTypes.SHOW_QUESTION_LOADER,
        payload
    }
}

export const setQuestionError = (): QuestionAction => {
    return {
        type: QuestionActionsTypes.SET_QUESTION_ERROR,
    }
}
export const incrementScore = (payload:number): QuestionAction => {
    return {
        type: QuestionActionsTypes.SCORE_INCREMENT,
        payload
    }
}

export const fetchQuestions= (amount: string, category: string, difficulty: string, qtype: string)  => {
    return {
        type: QuestionActionsTypes.FETCH_QUESTIONS,
        amount,
        category,
        difficulty,
        qtype
    }
}

export const getUserId = (payload: string|null) => {
    return {
        type: UserActionstypes.GET_USER_ID,
        payload
    }
}

export const setAuthError = (payload: string) => {
    return {
        type: UserActionstypes.SET_AUTH_ERROR,
        payload
    }
}

export const setUserName = (payload: string) => {
    return {
        type: UserActionstypes.SET_USERNAME,
        payload
    }
}
export const fetchUserName = () => {
    return {
        type: UserActionstypes.FETCH_USERNAME,
    }
}

export const loadUserQuizes = (payload: IQuiz[]) => {
    return {
        type: QuizActionTypes.LOAD_USER_QUIZES,
        payload
    }
}

export const fetchUserQuizes = () => {
    return {
        type: QuizActionTypes.FETCH_USER_QUIZES
    }
}

export const setIsQuizLoading = (payload: boolean) => {
    return {
        type: QuizActionTypes.SET_IS_QUIZES_LOADING,
        payload
    }
}

export const fetchCustomQuizActin = (payload: string) => {
    return {
        type: QuizActionTypes.FETCH_CUSTOM_QUIZ_QUESTIONS,
        payload
    }
}