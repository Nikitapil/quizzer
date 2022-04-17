export enum UserActionstypes {
    GET_USER_ID = "GET_USER_ID",
    SET_AUTH_ERROR = "SET_AUTH_ERROR",
    SET_USERNAME = "SET_USERNAME",
    FETCH_USERNAME = "FETCH_USERNAME"
}

export interface IUserState {
    userId: string | null,
    authError: string,
    userName: string
}

export interface IErrorMessage {
    code: string
}


export interface IAuthData {
    email: string,
    password: string,
    name?: string
}

interface IGetUserId {
    type: UserActionstypes.GET_USER_ID,
    payload: string | null
}

interface ISetAuthError {
    type: UserActionstypes.SET_AUTH_ERROR,
    payload: string
}
interface ISetUserName {
    type: UserActionstypes.SET_USERNAME,
    payload: string
}
export type UserAction = IGetUserId | ISetAuthError | ISetUserName