import { homeTypes } from "./home.types";
import { Reimb } from "../../models/reimb";

export const getCurrReimbs = (reimbs: Reimb[], status: number) => {
  console.log("getting current reimbs");
  const filterReimbs = reimbs.filter(reimb => {
    if (reimb.statusId === status) {
      return true;
    } else {
      return false;
    }
  });
  console.log(filterReimbs);
  return {
    payload: {
      currReimbs: filterReimbs
    },
    type: homeTypes.GET_CURR_REIMB
  };
};

export const changeStatus = (
  newReimbs: Reimb[],
  id: number,
  status: number
) => {
  console.log(`looking for id: ${id}`);
  newReimbs.forEach(reimb => {
    console.log(`reimb.id and val are  ${reimb.id} ${reimb.statusId}`);
    console.log(`hitting changeStatus with id: ${id}`);
    if (reimb.id === id) {
      console.log(reimb.id);
      reimb.statusId = status;
      console.log(`${reimb.id} changed to ${reimb.statusId} with ${status}`);
    }
  });
  return {
    payload: { reimbs: newReimbs },
    type: homeTypes.STATUS_CHANGE
  };
};
