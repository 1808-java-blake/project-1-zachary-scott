import { IScreenState } from ".";
import { screenTypes } from "../actions/screen/screen.types";
import { loginTypes } from "../actions/login/login.types";

const initialState: IScreenState = {
  errorMessage: "",
  screenUrl: "/login"
};

export const screenReducer = (
  state: IScreenState = initialState,
  action: any
) => {
  switch (action.type) {
    case screenTypes.UPDATE_SCREEN:
      return {
        ...state,
        screenUrl: action.payload.newScreenUrl
      };
    case loginTypes.ATTEMPT_LOGIN:
      return {
        ...state,
        screenUrl: action.payload.newScreenUrl
      };
    case screenTypes.UPDATE_ERROR:
      return {
        ...state,
        errorMessage: action.payload.errorMes
      };
    default:
      return state;
  }
};
