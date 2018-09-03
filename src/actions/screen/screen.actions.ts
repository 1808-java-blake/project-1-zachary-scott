import { screenTypes } from "./screen.types";

export const updateScreen = (url: string) => {
  console.log(`action called: url of ${url}`);
  return {
    payload: {
      newScreenUrl: url
    },
    type: screenTypes.UPDATE_SCREEN
  };
};

export const attemptLogin = (username: string, password: string) => {
  return {
    payload: {
      newScreenUrl: "/home"
    },
    type: screenTypes.ATTEMPT_LOGIN
  };
};
