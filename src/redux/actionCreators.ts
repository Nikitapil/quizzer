import { QuestionAction, QuestionActionsTypes } from './../types/questionTypes';
import { IQuestion } from '../types/questionTypes';
import { MainActions, MainActionTypes, IOption, IQuestionCount } from './../types/mainTypes';

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

export const fetchQuestions= (amount: string, category: string, difficulty: string, qtype: string)  => {
    return {
        type: QuestionActionsTypes.FETCH_QUESTIONS,
        amount,
        category,
        difficulty,
        qtype
    }
}