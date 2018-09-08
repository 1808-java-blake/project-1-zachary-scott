import { combineReducers } from "redux";
import { screenReducer } from "./screenReducer";
import { loginReducer } from "./loginReducer";
import { userReimbReducer } from "./userReimbReducer";
import { User } from "../models/user";
import { Reimb } from "../models/reimb";
import { reimbSubReducer } from "./reimbSubReducer";

export interface IScreenState {
  screenUrl: string;
  errorMessage: string;
}
export interface IUserReimbState {
  user: User;
  currReimbs: Reimb[];
  reimbList: Reimb[];
}
export interface ILoginState {
  password: string;
  username: string;
}
export interface ISubmitState {
  amount: number;
  description: string;
  type: number;
}

export interface IState {
  screen: IScreenState;
  login: ILoginState;
  userReimb: IUserReimbState;
  submission: ISubmitState;
}

export const state = combineReducers<IState>({
  login: loginReducer,
  screen: screenReducer,
  submission: reimbSubReducer,
  userReimb: userReimbReducer
});
