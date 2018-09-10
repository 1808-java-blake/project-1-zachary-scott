import { homeTypes } from "./home.types";
import { Reimb } from "../../models/reimb";

export const getCurrReimbs = (reimbs: Reimb[], status: number) => {
  console.log("getting current reimbs");
  let filterReimbs;
  if (status !== 0) {
    filterReimbs = reimbs.filter(reimb => {
      if (reimb.statusId === status) {
        return true;
      } else {
        return false;
      }
    });
  } else {
    filterReimbs = reimbs;
  }

  console.log(filterReimbs);
  console.log("filter value is", status);
  return {
    payload: {
      currReimbs: filterReimbs,
      filter: status
    },
    type: homeTypes.GET_CURR_REIMB
  };
};

export const changeStatus = (
  newReimbs: Reimb[],
  id: number,
  status: number
) => {
  newReimbs.forEach(reimb => {
    if (reimb.id === id) {
      console.log(reimb.id);
      reimb.statusId = status;
      console.log(`${reimb.id} changed to ${reimb.statusId} with ${status}`);
    }
  });
  return {
    payload: { currReimbs: newReimbs },
    type: homeTypes.STATUS_CHANGE
  };
};
