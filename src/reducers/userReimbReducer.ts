import { IUserReimbState } from ".";
import { fetchTypes } from "../actions/fetch/fetch.types";
import { User } from "../models/user";

import { homeTypes } from "../actions/home/home.types";
const initialState: IUserReimbState = {
  currReimbs: [],
  reimbList: [],
  user: new User(
    1,
    "zdscott",
    "pass",
    "Zachary not",
    "Scott",
    "Zdscott@goodcorp.net",
    1
  )
};

export const userReimbReducer = (
  state: IUserReimbState = initialState,
  action: any
) => {
  switch (action.type) {
    case fetchTypes.LOGIN:
      console.log("logging the user");
      console.log(action.payload.user);
      return {
        ...state,
        user: action.payload.user
      };
    case fetchTypes.GET_REIMB:
      console.log("logging reimbs");
      console.log(action.payload.reimbs);
      return {
        ...state,
        reimbList: action.payload.reimbs
      };
    case homeTypes.GET_CURR_REIMB:
      return {
        ...state,
        currReimbs: action.payload.currReimbs
      };
    case homeTypes.STATUS_CHANGE:
      return {
        ...state,
        reimbList: action.payload.reimbs
      };
    default:
      return state;
  }
};
