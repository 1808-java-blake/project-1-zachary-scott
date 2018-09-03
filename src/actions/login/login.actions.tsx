import { loginTypes } from "./login.types";

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
  return {
    payload: {
      password: newPassword
    },
    type: loginTypes.CHANGE_PASSWORD
  };
};
