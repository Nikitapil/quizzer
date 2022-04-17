import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { IAuthData } from "../types/userTypes";
import { child, get, getDatabase, ref, set, } from "firebase/database"
export default class AuthService {
    static async register({email, password, name}: IAuthData) {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, email, password)
        if(auth.currentUser) {
            const uid = auth.currentUser.uid
            const database = getDatabase()
            await set(ref(database, `/users/${uid}/info`), {
                name,
            })
        }
    }
    static async signOut() {
        const auth = getAuth()
        await signOut(auth)
    }

    static async signIn({email, password}: IAuthData) {
        const auth = getAuth()
        await signInWithEmailAndPassword(auth, email, password)
    }

    static async getName() {
        const auth = getAuth()
        if(auth.currentUser) {
            const uid = auth.currentUser.uid
            const database = getDatabase()
            const infoPath = ref(database);
            const info = await (await get(child(infoPath, `/users/${uid}/info`))).val()
            return info.name
        }
    }

} 