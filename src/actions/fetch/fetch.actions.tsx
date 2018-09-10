import { fetchTypes } from "./fetch.types";
import { User } from "../../models/user";
import { screenTypes } from "../screen/screen.types";
import { Reimb } from "../../models/reimb";
import { updateScreen } from "../screen/screen.actions";
import { updateSubmission } from "../submission/submission.actions";

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
        const newUser = new User(
          resp.id,
          resp.username,
          resp.password,
          resp.firstName,
          resp.lastName,
          resp.email,
          resp.roleID
        );
        dispatch({
          payload: {
            user: newUser
          },
          type: fetchTypes.LOGIN
        });

        dispatch({
          payload: {
            newScreenUrl: "/home"
          },
          type: screenTypes.UPDATE_SCREEN
        });
      }
    });
};

export const fetchReimbs = (user: User, list: string) => (dispatch: any) => {
  let fetchString: string;
  console.log(JSON.stringify(user));
  if (user.roleId === 1) {
    console.log("fetching all reimbs");
    fetchString = "http://localhost:3000/reimb/all";
  } else {
    console.log("fetching user reimbs");
    fetchString = `http://localhost:3000/reimb/${user.id}`;
  }
  fetch(fetchString, {
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json"
    },

    method: "POST"
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
        } else if (resp.status === 403) {
          dispatch({
            payload: {
              errorMes: "YOu don't have access to that. "
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
      let resolutionTime: string = "N/A";
      if (resp) {
        resp.forEach((reimb: Reimb) => {
          resolutionTime = "N/A";
          if (reimb.resolved) {
            resolutionTime = reimb.resolved;
          }
          newReimbs.push(
            new Reimb(
              reimb.id,
              reimb.amount,
              reimb.submitted.substring(0, reimb.submitted.length - 10),
              resolutionTime.substring(0, resolutionTime.length - 10),
              reimb.description,
              reimb.author,
              reimb.resolver,
              reimb.statusId,
              reimb.typeId
            )
          );
        });
        console.log(resp);
        console.log(newReimbs);
        dispatch({
          payload: {
            currReimbs: newReimbs,
            reimbs: newReimbs
          },
          type: fetchTypes.GET_REIMB
        });
      }
    });
};

export const submitStatusChange = (
  user: User,
  reimbs: Reimb[],
  compareReimbs: Reimb[]
) => (dispatch: any) => {
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

export const submitReimb = (
  subAmount: number,
  subDescription: string,
  subAuthor: number,
  subTypeId: number
) => (dispatch: any) => {
  console.log("submitting reimb");
  console.log(
    JSON.stringify({
      amount: subAmount,
      author: subAuthor,
      description: subDescription,
      typeId: subTypeId
    })
  );
  if (subTypeId === 0) {
    dispatch({
      payload: { errorMes: "You must select a type" },
      type: screenTypes.UPDATE_ERROR
    });
    return;
  }
  try {
    fetch(`http://localhost:3000/reimb/`, {
      body: JSON.stringify({
        amount: +subAmount,
        author: subAuthor,
        description: subDescription,
        typeId: subTypeId
      }),
      headers: {
        "Content-Type": "application/json"
      },
      method: "Post"
    }).then(resp => {
      if (resp.status === 201) {
        alert("created reimb");
        dispatch(updateScreen("/home"));
        dispatch(updateSubmission(0, "", 0));
      } else {
        dispatch({
          payload: {
            errorMes:
              "There was an error in reimbursement submission. Check that your reimbursement is formatted correctly."
          },
          type: screenTypes.UPDATE_ERROR
        });
      }
    });

    //   try {
    //     return resp.json();
    //   } catch (err) {
    //     dispatch({
    //       payload: { errorMes: "You must select a type" },
    //       type: screenTypes.UPDATE_ERROR
    //     });
    //     return 400;
    //   }
    // })
    // .then(resp => {
    //   if (resp === 201) {
    //     alert("Successfully submitted new reimbursement");
    //   } else if (resp === 403) {
    //     alert("Forbidden");
    //   } else {
    //     alert("failed to created");
    //   }
    // });
  } catch (err) {
    alert("failed to submit reimbursement");
  }
};
