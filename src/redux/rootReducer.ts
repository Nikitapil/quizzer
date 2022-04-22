import { userReducer } from "./userReducer";
import { questionReducer } from "./questionReducer";
import { mainReducer } from "./mainReducer";
import { combineReducers } from "redux";
import { quizReducer } from "./quizReducer";

export const rootReducer = combineReducers({
  main: mainReducer,
  question: questionReducer,
  user: userReducer,
  quiz: quizReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
