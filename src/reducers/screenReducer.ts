import { IScreenState } from ".";
import { screenTypes } from "../actions/screen/screen.types";

const initialState: IScreenState = {
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
    case screenTypes.ATTEMPT_LOGIN:
      console.log("asdfsdf");
      return {
        ...state,
        screenUrl: action.payload.newScreenUrl
      };
    default:
      return state;
  }
};
