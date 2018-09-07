import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { Reimb } from "../../models/reimb";
import { updateScreen } from "../../actions/screen/screen.actions";
import * as React from "react";
import { ReimbTableRows } from "../reimb-table-Rows";

interface IProps {
  fetchReimbs: (user: User, list: string) => any;
  user: User;
  reimbs: Reimb[];
  updateScreen: (url: string) => any;
}

class Home extends React.Component<IProps, any> {
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
            <ReimbTableRows reimbs={this.props.reimbs} />
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>Larry</td>
              <td>the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state: IState) => {
  return { reimbs: state.userReimb.reimbList, user: state.userReimb.user };
};
const mapDispatchToProps = { fetchReimbs, updateScreen };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
