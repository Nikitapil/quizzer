import { userReducer } from './userReducer';
import { questionReducer } from './questionReducer';
import { mainReducer } from './mainReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    main: mainReducer,
    question: questionReducer,
    user: userReducer
})

export type RootState = ReturnType<typeof rootReducer>