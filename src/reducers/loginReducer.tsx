import { loginTypes } from "../actions/login/login.types";
import { ILoginState } from ".";

const initialState: ILoginState = {
  password: "",
  username: ""
};

export const loginReducer = (
  state: ILoginState = initialState,
  action: any
) => {
  switch (action.type) {
    case loginTypes.CHANGE_USERNAME:
      console.log(action.payload.username);
      return {
        ...state,
        username: action.payload.username
      };
    case loginTypes.CHANGE_PASSWORD:
      return {
        ...state,
        password: action.payload.password
      };
    default:
      return state;
  }
};
