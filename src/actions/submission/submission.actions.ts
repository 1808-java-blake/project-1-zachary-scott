import { submissionTypes } from "./submission.types";
import { updateScreen } from "../screen/screen.actions";

export const updateSubmission = (
  newAmount: number,
  newDescription: string,
  newType: string
) => {
  return {
    payload: {
      amount: newAmount,
      description: newDescription,
      type: newType
    },
    type: submissionTypes.UPDATE_SUBMISSION
  };
};

export const submitReimbursement = (
  amount: number,
  description: string,
  type: string
) => (dispatch: any) => {
  if (true) {
    dispatch(updateScreen(`/home`));
  }
};
