import { loginTypes } from "./login.types";
import { updateScreen } from "../screen/screen.actions";
import { IState } from "../../reducers/index";
import { Dispatch } from "redux";

export const updateUsername = (newUsername: string) => {
  console.log(`updateusername called with value ${newUsername}`);
  return {
    payload: {
      username: newUsername
    },
    type: loginTypes.CHANGE_USERNAME
  };
};
export const updatePassword = (newPassword: string) => {
  console.log(`updateUsername called with value ${newPassword}`);
  return {
    payload: {
      password: newPassword
    },
    type: loginTypes.CHANGE_USERNAME
  };
};

export const attemptLogin = (username: string, password: string) => {
  console.log(JSON.stringify({ password: "pass", username: "zdscott" }));
  return (dispatch: Dispatch<IState>): any => {
    updateScreen("/home");
    fetch("http://localhost:3000/user/login", {
      body: JSON.stringify({ username: "zdscott", password: "pass" }),
      headers: { "Content-Type": "application/json" },
      method: "POST",

      mode: "no-cors"
    })
      .then(res => {
        console.log(res[0]);
        console.log(res[1]);
        return res;
      })
      .then(res =>
        dispatch({
          payload: {
            newScreenUrl: "/home"
          },
          type: loginTypes.ATTEMPT_LOGIN
        })
      );
  };
};
