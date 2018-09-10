import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { Reimb } from "../../models/reimb";
import { updateScreen } from "../../actions/screen/screen.actions";
import * as React from "react";
import StatusMenu from "../status-menu";
import { submitStatusChange } from "../../actions/fetch/fetch.actions";
import ReimbFilter from "../reimb-filter";
import { getCurrReimbs } from "../../actions/home/home.actions";
import "../../App.css";

interface IProps {
  fetchReimbs: (user: User, list: string) => any;
  user: User;
  dispReimbs: Reimb[];
  reimbs: Reimb[];
  updateScreen: (url: string) => any;
  submitStatusChange: (user: User, reimbs: Reimb[]) => any;
}

class HomeAdmin extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.getReimbs = this.getReimbs.bind(this);
    this.submissionScreen = this.submissionScreen.bind(this);
    this.submitChanges = this.submitChanges.bind(this);
  }

  public submitChanges(e: any) {
    e.preventDefault();
    this.props.submitStatusChange(this.props.user, this.props.reimbs);
  }
  public submissionScreen(e: any) {
    e.preventDefault();
    this.props.updateScreen("/submission");
  }

  public getReimbs(e: any) {
    e.preventDefault;
    this.props.fetchReimbs(this.props.user, "user");
  }

  public render() {
    console.log(this.props.user);
    console.log(this.props.reimbs);
    fetchReimbs(this.props.user, "user");
    getCurrReimbs(this.props.reimbs, 0);
    return (
      <div>
        <div className="sticky-class">
          <button className="btn btn-primary" onClick={this.submissionScreen}>
            submit a new reimbursement
          </button>
          <br />
          <h2>Reimbursements</h2> <br />
          <h3>Current Reimbursements {this.props.dispReimbs.length}</h3>
          <h3>total Reimbursements {this.props.reimbs.length}</h3>
          <span>
            <button className="btn btn-primary" onClick={this.getReimbs}>
              Refresh Reimbursements
            </button>
          </span>
          <ReimbFilter />
        </div>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">amount</th>
              <th scope="col">description</th>
              <th scope="col">submission time</th>
              <th scope="col">resolution time</th>
              <th scope="col">status</th>
              <th scope="col">type</th>;
            </tr>
          </thead>
          <tbody>
            {this.props.dispReimbs.map((reimb: Reimb) => {
              let statusText = "select";
              switch (reimb.statusId) {
                case 1:
                  statusText = "pending";
                  break;
                case 2:
                  statusText = "approved";
                  break;
                case 3:
                  statusText = "denied";
                  break;
                default:
                  statusText = "none";
              }

              let typeText = "select";
              switch (reimb.typeId) {
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
                default:
                  typeText = "none";
              }
              return (
                <tr key={reimb.id}>
                  <th scope="row">{reimb.amount}</th>
                  <td>{reimb.description}</td>
                  <td>{reimb.submitted}</td>
                  <td>{reimb.resolved}</td>
                  <td>
                    <StatusMenu
                      reimbs={this.props.reimbs}
                      idVal={reimb.id}
                      currStatus={statusText}
                    />
                  </td>
                  <td>{typeText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <ReimbFilter />
        <button onClick={this.submitChanges} className="btn btn-primary">
          Submit Status Changes
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return {
    dispReimbs: state.userReimb.currReimbs,
    reimbs: state.userReimb.reimbList,
    user: state.userReimb.user
  };
};
const mapDispatchToProps = {
  fetchReimbs,
  getCurrReimbs,
  submitStatusChange,
  updateScreen
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeAdmin);
