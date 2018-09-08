import { fetchTypes } from "./fetch.types";
import { User } from "../../models/user";
import { screenTypes } from "../screen/screen.types";
import { Reimb } from "../../models/reimb";
import { updateError } from "../screen/screen.actions";
import { homeTypes } from "../home/home.types";

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

export const fetchLogin = (loginUsername: string, loginPassword: string) => (
  dispatch: any
) => {
  const response: any = () =>
    fetch("http://localhost:3000/user/login/", {
      body: JSON.stringify({
        password: loginPassword,
        username: loginUsername
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "POST"
    });

  response()
    .then((resp: any) => {
      try {
        if (resp === null) {
          return;
        } else if (resp.status === 404) {
          console.log("user not found");
          dispatch({
            payload: {
              errorMes: "Your username or password are incorrect."
            },
            type: screenTypes.UPDATE_ERROR
          });

          return;
        } else {
          return resp.json();
        }
      } catch (err) {
        dispatch({
          payload: { errorMes: "Something Went Wrong" },
          type: screenTypes.UPDATE_ERROR
        });
      }
    })
    .then((resp: any) => {
      if (resp) {
        dispatch({
          payload: {
            user: resp
          },
          type: fetchTypes.LOGIN
        });
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
    });
};

export const fetchReimbs = (user: User, list: string) => (dispatch: any) => {
  const resp = {
    reimbs: reqReimbs,
    status: 201
  };
  if (resp.status === 201) {
    console.log(`grabbed the reimbs: ${resp.reimbs}`);
    console.log(resp.reimbs);
    // dispatch({ type: "nothing" });
    dispatch({
      payload: {
        reimbs: resp.reimbs
      },
      type: fetchTypes.GET_REIMB
    });
    dispatch({
      payload: {
        currReimbs: resp.reimbs
      },
      type: homeTypes.GET_CURR_REIMB
    });
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

export const submitChanges = (reimbs: Reimb[]) => (dispatch: any) => {
  const resp = { status: 201 };
  reimbs.forEach(reimb => {
    try {
      console.log("changes logged");
    } catch (err) {
      dispatch(updateError("We experienced a server error"));
    }
    if (resp.status === 201) {
      alert("Success: Reimbursements updated");
    } else if (resp.status === 403) {
      alert("Failure: That is FORBIDEEN");
      dispatch(updateError("Don't try to spoof our system."));
    } else {
      alert("Failure: Something went wrong on our end");
      dispatch(updateError("We experienced a server error, sorry about that."));
    }
  });
};

export const submitStatusChange = (newReimbs: Reimb[]) => {
  const resp = { status: 201 };

  if (resp.status === 201) {
    alert("Successfully updated Statuses");
  }
  return {
    payload: { errorMes: "" },
    type: screenTypes.UPDATE_ERROR
  };
};
