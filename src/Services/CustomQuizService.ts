import { getAuth } from "firebase/auth";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
} from "firebase/database";
import { IQuizData } from "../types/questionTypes";

export default class CustomQuizService {
  static async createQuiz(quizData: IQuizData) {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const database = getDatabase();
      const { key } = await push(ref(database, `/allQuizes/`), quizData);
      const userQuizData = { ...quizData, id: key };
      await push(ref(database, `/users/${uid}/quizes`), userQuizData);
    }
  }

  static async fetchUserQuizes() {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const database = getDatabase();
      const quizesPath = ref(database);
      const response = await (
        await get(child(quizesPath, `/users/${uid}/quizes`))
      ).val();
      const quizes = Object.keys(response).map((item) => ({
        ...response[item],
        idUserQuiz: item,
      }));
      return quizes;
    }
  }

  static async getCustomQuizQuestions(quizId: string) {
    const database = getDatabase();
    const questionsPath = ref(database);
    const response = await (
      await get(child(questionsPath, `/allQuizes/`))
    ).val();
    const questions = response[quizId].questions;
    return questions;
  }

  static async getAllQuizes() {
    const database = getDatabase();
    const questionsPath = ref(database);
    const response = await (
      await get(child(questionsPath, `/allQuizes/`))
    ).val();
    const quizes = Object.keys(response)
      .map((key) => ({ ...response[key], id: key }))
      .filter((quiz) => !quiz.isPrivate);
    return quizes;
  }

  static async deleteQuiz(quizId: string, idUserQuiz: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const database = getDatabase();
      await set(ref(database, `/allQuizes/${quizId}`), null);
      await set(ref(database, `/users/${uid}/quizes/${idUserQuiz}`), null);
    }
  }
}
