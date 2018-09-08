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

    return (
      <div>
        <button onClick={this.getReimbs}>press for reimbs</button>
        <button onClick={this.submissionScreen}>submit a reimbursement</button>
        <p>{this.props.reimbs.length}</p>

        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">amount</th>
              <th scope="col">submission time</th>
              <th scope="col">resolution time</th>
              <th scope="col">status</th>
              <th scope="col">type</th>;
            </tr>
          </thead>
          <tbody>
            {this.props.dispReimbs.map((reimb: Reimb) => (
              <tr key={reimb.id}>
                <th scope="row">{reimb.amount}</th>

                <td>{reimb.submitted}</td>
                <td>{reimb.resolved}</td>
                <td>
                  <StatusMenu
                    reimbs={this.props.reimbs}
                    idVal={reimb.id}
                    currStatus={reimb.statusId}
                  />
                </td>
                <td>{reimb.typeId}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <ReimbFilter />
        <button onClick={this.submitChanges}>Submit Status Changes </button>
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
const mapDispatchToProps = { fetchReimbs, submitStatusChange, updateScreen };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeAdmin);
