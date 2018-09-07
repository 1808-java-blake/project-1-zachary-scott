import { submissionTypes } from "./submission.types";

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
