import { mainReducer } from './mainReducer';
import { combineReducers } from "redux";

export const rootReducer = combineReducers({
    main: mainReducer
})

export type RootState = ReturnType<typeof rootReducer>