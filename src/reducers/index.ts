import { combineReducers } from "redux";
import { screenReducer } from "./screenReducer";
import { loginReducer } from "./loginReducer";

export interface IScreenState {
  screenUrl: string;
}

export interface ILoginState {
  password: string;
  username: string;
}
export interface IState {
  screen: IScreenState;
  login: ILoginState;
}
export const state = combineReducers<IState>({
  login: loginReducer,
  screen: screenReducer
});
