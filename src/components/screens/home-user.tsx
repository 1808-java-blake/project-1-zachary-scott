import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { Reimb } from "../../models/reimb";
import { updateScreen } from "../../actions/screen/screen.actions";
import * as React from "react";

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
      <div>
        <button onClick={this.getReimbs}>press for reimbs</button>
        <button onClick={this.submitScreen}>submit a reimbursement</button>
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
            {this.props.reimbs.map((reimb: Reimb) => (
              <tr key={reimb.id}>
                <th scope="row">{reimb.amount}</th>

                <td>{reimb.submitted}</td>
                <td>{reimb.resolved}</td>
                <td>{reimb.statusId}</td>
                <td>{reimb.typeId}</td>
              </tr>
            ))}
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
