import { fetchTypes } from "./fetch.types";
import { User } from "../../models/user";
import { screenTypes } from "../screen/screen.types";
import { Reimb } from "../../models/reimb";
const respUser: User = new User(
  1,
  "zdscott",
  "pass",
  "Zachary",
  "Scott",
  "Zdscott@evilcorp.net",
  1
);

const reqReimbs: Reimb[] = [
  new Reimb(
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
  new Reimb(
    2,
    100,
    "a long time ago",
    "soon hopefully",
    "testing reimb",
    2,
    1,
    1,
    1
  )
];

export const fetchLogin = (username: string, password: string) => (
  dispatch: any
) => {
  if (true) {
    dispatch({
      payload: {
        newScreenUrl: "/home"
      },
      type: screenTypes.UPDATE_SCREEN
    });
    console.log(`got the login: ${respUser}`);
    console.log(respUser);
    dispatch({
      payload: {
        user: respUser
      },
      type: fetchTypes.LOGIN
    });
  }
};

export const fetchReimbs = (user: User, list: string) => {
  const resp = {
    reimbs: reqReimbs,
    status: 201
  };
  if (resp.status === 201) {
    console.log(`grabbed the reimbs: ${resp.reimbs}`);
    console.log(resp.reimbs);
    // dispatch({ type: "nothing" });
    return {
      payload: {
        reimbs: resp.reimbs
      },
      type: fetchTypes.GET_REIMB
    };
  } else if (resp.status === 403) {
    return {};
    // dispatch({
    //   payload: {
    //     errorMes: "that is forbidden for non-admins. Get out of inspect element"
    //   },
    //   type: screenTypes.UPDATE_ERROR
    // });
  }
  return {};
  //   dispatch({
  //     payload: {
  //       errorMes: "Something went Wrong, our bad."
  //     },
  //     type: screenTypes.UPDATE_ERROR
  //   });
  //   return {};
};
