import { combineReducers } from "redux";
import { screenReducer } from "./screenReducer";
import { loginReducer } from "./loginReducer";
import { userReimbReducer } from "./userReimbReducer";
import { User } from "../models/user";
import { Reimb } from "../models/reimb";

export interface IScreenState {
  screenUrl: string;
  errorMessage: string;
}

export interface IUserReimbState {
  user?: User;
  currReimb?: Reimb;
  reimbList: Reimb[];
}
export interface ILoginState {
  password: string;
  username: string;
}
export interface IState {
  screen: IScreenState;
  login: ILoginState;
  userReimb: IUserReimbState;
}
export const state = combineReducers<IState>({
  login: loginReducer,
  screen: screenReducer,
  userReimb: userReimbReducer
});
