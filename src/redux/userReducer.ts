import { IUserState, UserAction, UserActionstypes } from "../types/userTypes";

export const initialState: IUserState = {
  userId: null,
  authError: ''
};

export const userReducer = (state = initialState, action: UserAction) => {
  switch (action.type) {
      case UserActionstypes.GET_USER_ID:
          return {...state, userId: action.payload}
      case UserActionstypes.SET_AUTH_ERROR:
          return {...state, authError: action.payload}
    default:
      return state;
  }
};
