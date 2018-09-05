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
