import { getAuth } from "firebase/auth";
import { child, get, getDatabase, push, ref } from "firebase/database";
import { IQuizData } from "../types/questionTypes";

export default class CustomQuizService {
    static async createQuiz(quizData: IQuizData) {
        const auth = getAuth()
        if(auth.currentUser) {
            const uid = auth.currentUser.uid
            const database = getDatabase()
            const {key} = await push(ref(database, `/allQuizes/`), quizData)
            const userQuizData = {...quizData, id: key}
            await push(ref(database, `/users/${uid}/quizes`), userQuizData)
        }
    }

    static async fetchUserQuizes() {
        const auth = getAuth()
        if(auth.currentUser) {
            const uid = auth.currentUser.uid
            const database = getDatabase()
            const quizesPath = ref(database);
            const response = await (await get(child(quizesPath, `/users/${uid}/quizes`))).val()
            const quizes = Object.keys(response).map(item => response[item])
            return quizes
        }
    }

    static async getCustomQuizQuestions(quizId: string) {
        const database = getDatabase()
        const questionsPath = ref(database);
         const response = await (await get(child(questionsPath, `/allQuizes/`))).val()
         const questions = response[quizId].questions
         console.log(quizId);
         
         return questions
    }
}