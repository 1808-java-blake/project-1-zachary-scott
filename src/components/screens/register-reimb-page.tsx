import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { updateSubmission } from "../../actions/submission/submission.actions";
import * as React from "react";
import { submitReimb } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import "../../App.css";
import { updateScreen } from "../../actions/screen/screen.actions";
/**
 * This screen allows users to submit new reimbursements
 */
interface IProps {
  user: User;
  amount: number;
  description: string;
  type: number;
  submitReimb: (
    amount: number,
    description: string,
    author: number,
    type: number
  ) => any;
  updateScreen: (url: string) => any;
  updateSubmission: (amount: number, description: string, type: number) => any;
}

class RegisterReimbPage extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.submitReimbursement = this.submitReimbursement.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.changeDescription = this.changeDescription.bind(this);
    this.changeType1 = this.changeType1.bind(this);
    this.changeType2 = this.changeType2.bind(this);
    this.changeType3 = this.changeType3.bind(this);
    this.changeType4 = this.changeType4.bind(this);
    this.goHome = this.goHome.bind(this);
  }

  // Instead of making 3 update submission actions, I made three local function
  // and changed the passed values from props each time to update the submission form
  public changeAmount = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(
      +e.target.value,
      this.props.description,
      this.props.type
    );
  };
  public goHome(e: any) {
    e.preventDefault();
    this.props.updateScreen("/home");
  }

  public changeDescription = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(
      this.props.amount,
      e.target.value,
      this.props.type
    );
  };

  public changeType1 = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(this.props.amount, this.props.description, 1);
  };

  public changeType2 = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(this.props.amount, this.props.description, 2);
  };

  public changeType3 = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(this.props.amount, this.props.description, 3);
  };

  public changeType4 = (e: any) => {
    e.preventDefault();
    this.props.updateSubmission(this.props.amount, this.props.description, 4);
  };

  // submits the reimb
  public submitReimbursement(e: any) {
    e.preventDefault();
    this.props.submitReimb(
      this.props.amount,

      this.props.description,
      this.props.user.id,
      this.props.type
    );
  }
  public render() {
    let typeText;
    switch (this.props.type) {
      case 0:
        typeText = "select";
        break;
      case 1:
        typeText = "lodging";
        break;
      case 2:
        typeText = "travel";
        break;
      case 3:
        typeText = "food";
        break;
      case 4:
        typeText = "other";
        break;
    }
    return (
      <div>
        <button
          id="home-button"
          type="submit"
          className="btn btn-primary"
          onClick={this.goHome}
        >
          Go back to home
        </button>
        <h2>Reimbursement Submission </h2>

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

        <div id="type-button" className="btn-group dropright">
          <button
            type="button"
            className="btn btn-primary dropdown-toggle"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Type: {typeText}
          </button>
          <div className="dropdown-menu">
            <button
              className="dropdown-item"
              type="button"
              onClick={this.changeType1}
            >
              lodging
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={this.changeType2}
            >
              travel
            </button>

            <button
              className="dropdown-item"
              type="button"
              onClick={this.changeType3}
            >
              food
            </button>
            <button
              className="dropdown-item"
              type="button"
              onClick={this.changeType4}
            >
              other
            </button>
          </div>
        </div>
        <br />

        <button
          id="submit-button"
          type="submit"
          className="btn btn-primary"
          onClick={this.submitReimbursement}
        >
          Submit reimbursement
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    amount: state.submission.amount,
    description: state.submission.description,
    reimbs: state.userReimb.reimbList,
    type: state.submission.type,
    user: state.userReimb.user
  };
};
const mapDispatchToProps = {
  fetchReimbs,
  submitReimb,
  updateScreen,
  updateSubmission
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterReimbPage);
