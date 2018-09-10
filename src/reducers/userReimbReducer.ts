import { IUserReimbState } from ".";
import { fetchTypes } from "../actions/fetch/fetch.types";
import { User } from "../models/user";

import { homeTypes } from "../actions/home/home.types";
const initialState: IUserReimbState = {
  currReimbs: [],
  filter: 0,
  reimbList: [],
  user: new User(
    1,
    "zdscott",
    "plplpl",
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
        currReimbs: action.payload.reimbs,
        reimbList: action.payload.reimbs
      };
    case homeTypes.GET_CURR_REIMB:
      console.log(
        `filter: ${state.filter} changed to ${action.payload.filter}`
      );
      return {
        ...state,
        currReimbs: action.payload.currReimbs,
        filter: action.payload.filter
      };
    case homeTypes.STATUS_CHANGE:
      return {
        ...state,
        currReimbs: action.payload.currReimbs
      };
    default:
      return state;
  }
};
