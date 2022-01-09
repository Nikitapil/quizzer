import { IMainState, IOption, MainActionTypes } from "./../types/mainTypes";
import { MainActions } from "../types/mainTypes";

const initialState: IMainState = {
  categories: [],
  questionCategory: 0,
  questionDificulty: "",
  questionType: "",
  questionsAmount: '10',
  categoriesLoading: false,
  categoriesError: false,
  categoryQuestionCount: {
    total_question_count: 50,
    total_easy_question_count: 50,
    total_medium_question_count: 50,
    total_hard_question_count: 50,
  },
};

export const mainReducer = (state = initialState, action: MainActions) => {
  switch (action.type) {
    case MainActionTypes.SET_DIFFICULTY:
      return { ...state, questionDificulty: action.payload };
    case MainActionTypes.SET_TYPE:
      return { ...state, questionType: action.payload };
    case MainActionTypes.LOAD_CATEGORIES:
      return { ...state, categories: action.payload };
    case MainActionTypes.SET_CATEGORIES:
      return { ...state, questionCategory: action.payload };
    case MainActionTypes.SHOW_CATEGORIES_LOADER:
      return { ...state, categoriesLoading: action.payload };
    case MainActionTypes.SET_CATEGORIES_ERROR:
      return { ...state, categoriesError: !state.categoriesError };
    case MainActionTypes.SET_QUESTION_AMOUNT:
      return { ...state, categoryQuestionCount: action.payload };
      case MainActionTypes.CHANGE_QUESTION_AMOUNT:
        return { ...state, questionsAmount: action.payload };
    default:
      return state;
  }
};
