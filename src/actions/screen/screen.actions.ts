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

export const updateError = (errorMes:string) => {

return {
  payload:{
    errorMessage: errorMes
  },
  type: screenTypes.UPDATE_ERROR
}
}
