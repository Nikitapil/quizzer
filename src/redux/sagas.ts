import { QuestionActionsTypes } from './../types/questionTypes';
import { loadCategories, loadQuestions, setCategoriesError, setQuestionAmount, setQuestionError, setUserName, showCategoriesloading, showQuestionLoader } from "./actionCreators";
import { MainActionTypes, ResponseGenerator } from "./../types/mainTypes";
import { takeEvery, put, call } from "redux-saga/effects";
import Service from "../Services/Service";
import AuthService from '../Services/AuthService';
import { UserActionstypes } from '../types/userTypes';

function* getCategoriesSaga() {
  try {
    yield put(showCategoriesloading(true))
    const response: ResponseGenerator = yield call(Service.getCategories);
    yield put(loadCategories(response.data.trivia_categories));
  } catch (error) {
      yield put (setCategoriesError())
  }
  finally {
    yield put(showCategoriesloading(false))
  }
}

function* getQuestionCountSaga({payload}: any) {
    try {
        yield put(showCategoriesloading(true))
        if (payload) {
            const response: ResponseGenerator = yield call(() => Service.getQuestionCount(payload));
        yield put(setQuestionAmount(response.data.category_question_count))
        }
    } catch (error) {
        
    }
    finally {
        yield put(showCategoriesloading(false))
    }
}

function* getUserName() {
  try {
    const userName: string = yield call(AuthService.getName)
    yield put(setUserName(userName))
  } catch (error) {
    yield put(setUserName(''))
  }
}
function* getQuestionsSaga({amount,
    category,
    difficulty,
    qtype}: any) {
        try {
          yield put(showQuestionLoader(true))
          const response: ResponseGenerator = yield call(() => Service.getQuestions(amount, category, difficulty, qtype));
          yield put(loadQuestions(response.data.results))
        } catch (error) {
          yield put(setQuestionError())
        }
        finally {
           yield put(showQuestionLoader(false))
        }

    }


export function* sagaWatcher() {
  yield takeEvery(MainActionTypes.FETCH_CATEGORIES, getCategoriesSaga);
  yield takeEvery(MainActionTypes.SET_CATEGORIES, getQuestionCountSaga);
  yield takeEvery(QuestionActionsTypes.FETCH_QUESTIONS, getQuestionsSaga);
  yield takeEvery(UserActionstypes.FETCH_USERNAME, getUserName);
}
