import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { rootReducer } from "./rootReducer";
import createSagaMiddleware from 'redux-saga'
import { sagaWatcher } from "./sagas";

const sagaMiddleWare = createSagaMiddleware()

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleWare)))

sagaMiddleWare.run(sagaWatcher)
