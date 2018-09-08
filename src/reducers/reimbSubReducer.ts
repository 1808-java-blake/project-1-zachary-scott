import { ISubmitState } from ".";
import { submissionTypes } from "../actions/submission/submission.types";

const initialState: ISubmitState = {
  amount: 0,
  description: "",
  type: ""
};
export const reimbSubReducer = (
  state: ISubmitState = initialState,
  action: any
) => {
  switch (action.type) {
    case submissionTypes.UPDATE_SUBMISSION:
      return {
        ...state,
        amount: action.payload.amount,
        description: action.payload.description,
        types: action.payload.type
      };
    default:
      return state;
  }
};
