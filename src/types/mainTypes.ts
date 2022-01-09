export interface IOption {
  id: string;
  name: string;
}

export interface IQuestionCount {
  total_question_count: number;
  total_easy_question_count: number;
  total_medium_question_count: number;
  total_hard_question_count: number;
}

export interface IMainState {
  categories: IOption[];
  questionCategory: string;
  questionDificulty: string;
  questionType: string;
  questionsAmount: string;
  categoriesLoading: boolean;
  categoriesError: boolean;
  categoryQuestionCount: IQuestionCount
  [key: string]: any;
}
export interface ResponseGenerator {
  config?: any;
  data?: any;
  headers?: any;
  request?: any;
  status?: number;
  statusText?: string;
}

export enum MainActionTypes {
  SET_CATEGORIES = "SET_CATEGORIES",
  SET_DIFFICULTY = "SET_DIFFICULTY",
  SET_TYPE = "SET_TYPE",
  FETCH_CATEGORIES = "FETCH_CATEGORIES",
  LOAD_CATEGORIES = "LOAD_CATEGORIES",
  SHOW_CATEGORIES_LOADER = "SHOW_LOADER",
  SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR",
  SET_QUESTION_AMOUNT = "SET_QUESTION_AMOUNT",
  CHANGE_QUESTION_AMOUNT = "CHANGE_QUESTION_AMOUNT"
}

interface ISetCategoriesActions {
  type: MainActionTypes.SET_CATEGORIES;
  payload: string;
}

interface ISetDifficultyActions {
  type: MainActionTypes.SET_DIFFICULTY;
  payload: string;
}

interface ISetTypeActions {
  type: MainActionTypes.SET_TYPE;
  payload: string;
}

interface ILoadCategoriesActions {
  type: MainActionTypes.LOAD_CATEGORIES;
  payload: IOption[];
}
interface IShowCategoriesloaderActions {
  type: MainActionTypes.SHOW_CATEGORIES_LOADER;
  payload: boolean;
}
interface IShowCategoriesErrorActions {
  type: MainActionTypes.SET_CATEGORIES_ERROR;
}

interface ISetQuestionAmountActions {
    type: MainActionTypes.SET_QUESTION_AMOUNT;
    payload: IQuestionCount
  }
  interface IChangeQuestionAmountActions {
    type: MainActionTypes.CHANGE_QUESTION_AMOUNT;
    payload: string
  }

export type MainActions =
  | ISetCategoriesActions
  | ISetDifficultyActions
  | ISetTypeActions
  | ILoadCategoriesActions
  | IShowCategoriesloaderActions
  | IShowCategoriesErrorActions
  | ISetQuestionAmountActions
  | IChangeQuestionAmountActions
