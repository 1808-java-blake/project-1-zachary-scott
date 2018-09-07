import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { updateSubmission } from "../../actions/submission/submission.actions";
import * as React from "react";
import { submitReimbursement } from "../../actions/submission/submission.actions";
/**
 * This screen allows users to submit new reimbursements
 */
interface IProps {
  amount: number;
  description: string;
  type: string;
  submitReimbursement: (
    amount: number,
    description: string,
    type: string
  ) => any;
  updateSubmission: (amount: number, description: string, type: string) => any;
}

class RegisterReimbPage extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.submitReimbursement = this.submitReimbursement.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeType = this.changeType.bind(this);
  }

  // Instead of making 3 update submission actions, I made three local function
  // and changed the passed values from props each time to update the submission form
  public changeAmount = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(
      e.target.value,
      this.props.description,
      this.props.type
    );
  };

  public changeDescription = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(
      this.props.amount,
      e.target.value,
      this.props.type
    );
  };

  public changeType = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(
      this.props.amount,
      this.props.description,
      e.target.value
    );
  };

  // submits the reimb
  public submitReimbursement(e: any) {
    e.preventDefault();
    this.props.submitReimbursement(
      this.props.amount,
      this.props.description,
      this.props.type
    );
  }
  public render() {
    return (
      <div>
        <h3>Enter reimbursement submission </h3>

        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            className="form-control"
            id="amount"
            onChange={this.changeAmount}
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input
            type="string"
            className="form-control"
            id="amount"
            onChange={this.changeDescription}
          />
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
            if (tru)
            {
              <button className="dropdown-item" type="button">
                Something else here
              </button>
            }
          </div>
        </div>
        <form onSubmit={this.submitReimbursement}>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return { reimbs: state.userReimb.reimbList, user: state.userReimb.user };
};
const mapDispatchToProps = {
  fetchReimbs,
  submitReimbursement,
  updateSubmission
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReimbPage);
