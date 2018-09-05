import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { Reimb } from "../../models/reimb";
import * as React from "react";

interface IProps {
  fetchReimbs: (user: User, list: string) => any;
  user: User;
  reimbs: Reimb[];
}

class Home extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.fetchReimbs = this.fetchReimbs.bind(this);
  }

  public fetchReimbs(e: any) {
    e.preventDefault;
    this.props.fetchReimbs(this.props.user, "user");
  }
  public render() {
    console.log(this.props.user);
    console.log(this.props.reimbs);
    return (
      <div>
        <button onClick={this.fetchReimbs}>press for reimbs</button>
        <p>{this.props.reimbs}</p>
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
)(Home);
