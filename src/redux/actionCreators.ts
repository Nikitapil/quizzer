import { MainActions, MainActionTypes, IOption, IQuestionCount } from './../types/mainTypes';

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

export const setCategories= (payload: number): MainActions => {
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

