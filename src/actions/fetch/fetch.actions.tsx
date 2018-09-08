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

// const reqReimbs: Reimb[] = [
//   new Reimb(
//     1,
//     100,
//     "a long time ago",
//     "soon hopefully",
//     "testing reimb",
//     1,
//     1,
//     1,
//     1
//   ),
//   new Reimb(
//     2,
//     100,
//     "a long time ago",
//     "soon hopefully",
//     "testing reimb",
//     2,
//     1,
//     1,
//     1
//   )
// ];

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
  let fetchString: string;

  if (user.roleID === 1) {
    fetchString = "http://localhost:3000/reimb/all";
  } else {
    fetchString = `http://localhost:3000/reimb/${user.id}`;
  }
  fetch(fetchString, {
    headers: {
      "Content-Type": "application/json"
    },
    method: "GET"
  })
    .then((resp: any) => {
      try {
        if (resp === null) {
          return;
        } else if (resp.status === 404) {
          console.log("user not found");
          dispatch({
            payload: {
              errorMes: "Server couldn't find aany reimbursements"
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
    .then(resp => {
      const newReimbs: Reimb[] = [];
      resp.forEach((reimb: Reimb) => {
        newReimbs.push(
          new Reimb(
            reimb.id,
            reimb.amount,
            reimb.submitted,
            reimb.resolved && reimb.resolved,
            reimb.description,
            reimb.author,
            reimb.resolver && reimb.resolver,
            reimb.statusId,
            reimb.typeId
          )
        );
      });
      console.log(resp);
      console.log(newReimbs);
      dispatch({
        payload: {
          reimbs: newReimbs
        },
        type: fetchTypes.GET_REIMB
      });
    });
};

export const submitStatusChange = (user: User, reimbs: Reimb[]) => (
  dispatch: any
) => {
  console.log("submitting changes");
  let failCount: number = 0;
  reimbs.forEach(reimb => {
    try {
      fetch(`http://localhost:3000/reimb/${user.id}`, {
        body: JSON.stringify({
          amount: reimb.amount,
          author: reimb.author,
          description: reimb.description,
          id: reimb.id,
          statusId: reimb.statusId,
          typeId: reimb.typeId
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: "PATCH"
      });
    } catch (err) {
      failCount++;
    }
  });
  dispatch({
    payload: { errorMess: `${failCount} entries failed to update` },
    type: screenTypes.UPDATE_ERROR
  });
};
