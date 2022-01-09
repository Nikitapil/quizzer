import axios from "axios";

export default class Service {
    static async getCategories () {
        const response = await axios.get('https://opentdb.com/api_category.php')
        return response
    }
    static async getQuestionCount (id:string) {
        const response = await axios.get(`https://opentdb.com/api_count.php?category=${id}`)
        return response
    }
}