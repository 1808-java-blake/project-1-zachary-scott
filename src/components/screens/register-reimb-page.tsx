import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";

import * as React from "react";

interface IProps {
  amount: number;
  description: string;
  type: string;
}

class RegisterReimbPage extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.submitReimb = this.submitReimb.bind(this);
  }
  public submitReimb(e: any) {
    e.preventDefault();
    console.log("yup it changed");
  }
  public render() {
    return (
      <div>
        <h3>Enter reimbursement submission </h3>

        <div className="form-group">
          <label>Name:</label>
          <input type="text" className="form-control" id="usr" />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" className="form-control" id="pwd" />
        </div>

        <div className="btn-group dropright">
          <button
            type="button"
            className="btn btn-secondary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Type
          </button>
          <div className="dropdown-menu">
            <button className="dropdown-item" type="button">
              Action
            </button>
            <button className="dropdown-item" type="button">
              Another action
            </button>
            <button className="dropdown-item" type="button">
              Something else here
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return { reimbs: state.userReimb.reimbList, user: state.userReimb.user };
};
const mapDispatchToProps = { fetchReimbs };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReimbPage);
