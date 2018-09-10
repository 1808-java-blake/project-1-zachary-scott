import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { Reimb } from "../../models/reimb";
import { updateScreen } from "../../actions/screen/screen.actions";
import * as React from "react";
import "../../App.css";
import ReimbFilter from "../reimb-filter";

interface IProps {
  fetchReimbs: (user: User, list: string) => any;
  user: User;
  reimbs: Reimb[];
  updateScreen: (url: string) => any;
}

class HomeUser extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.getReimbs = this.getReimbs.bind(this);
    this.submitScreen = this.submitScreen.bind(this);
  }

  public submitScreen(e: any) {
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
      <div className="sticky-class">
        <button className="btn btn-primary" onClick={this.submitScreen}>
          submit a new reimbursement
        </button>
        <br />
        <h2>Reimbursements</h2> <br />
        <h3>
          you have {this.props.reimbs.length} reimbursements of this type{" "}
        </h3>
        <span>
          <button className="btn btn-primary" onClick={this.getReimbs}>
            Refresh Reimbursements
          </button>
        </span>
        <ReimbFilter />
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
            {this.props.reimbs.map((reimb: Reimb) => {
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
                  <td>{statusText}</td>
                  <td>{typeText}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return { reimbs: state.userReimb.currReimbs, user: state.userReimb.user };
};
const mapDispatchToProps = { fetchReimbs, updateScreen };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeUser);
