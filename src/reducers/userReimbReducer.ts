import { IUserReimbState } from "./index";
import { fetchTypes } from "../actions/fetch/fetch.types";
import { User } from "../models/user";
import { Reimb } from "../models/reimb";

const initialState: IUserReimbState = {
  currReimb: new Reimb(
    1,
    100,
    "a long time ago",
    "soon hopefully",
    "testing reimb",
    1,
    1,
    1,
    1
  ),
  reimbList: [],
  user: new User(
    1,
    "zdscott",
    "pass",
    "Zachary",
    "Scott",
    "Zdscott@evilcorp.net",
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
      console.log(action.payload.user);
      return {
        ...state,
        reimbList: action.payload.reimbs
      };
    default:
      return state;
  }
};
