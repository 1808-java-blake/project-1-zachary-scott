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

class Home extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.fetchReimbs = this.fetchReimbs.bind(this);
    this.submitScreen = this.submitScreen.bind(this);
  }

  public submitScreen(e: any) {
    e.preventDefault();
    this.props.updateScreen("/submission");
  }

  public fetchReimbs(e: any) {
    e.preventDefault;
    this.props.fetchReimbs(this.props.user, "user");
  }
  public render() {
    console.log(this.props.user);
    console.log(this.props.reimbs);
    if (this.props.reimbs[0]) {
      return (
        <div>
          <button onClick={this.fetchReimbs}>press for reimbs</button>
          <button onClick={this.submitScreen}>submit a reimbursement</button>
          <p>{this.props.reimbs[0].description}</p>
        </div>
      );
    }

    return (
      <div>
        <button onClick={this.fetchReimbs}>press for reimbs</button>
        <p />
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
