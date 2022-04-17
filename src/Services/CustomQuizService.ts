import { getAuth } from "firebase/auth";
import { getDatabase, push, ref } from "firebase/database";
import { IQuizData } from "../types/questionTypes";

export default class CustomQuizService {
    static async createQuiz(quizData: IQuizData) {
        const auth = getAuth()
        if(auth.currentUser) {
            const uid = auth.currentUser.uid
            const database = getDatabase()
            await push(ref(database, `/users/${uid}/quizes`), quizData)
        }
    }
}