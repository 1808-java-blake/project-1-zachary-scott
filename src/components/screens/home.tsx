import { IState } from "../../reducers";
import { connect } from "react-redux";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";
import { User } from "../../models/user";
import { updateScreen } from "../../actions/screen/screen.actions";
import * as React from "react";
import "../../App.css";
import HomeUser from "./home-user";
import HomeAdmin from "./home-admin";

interface IProps {
  user: User;
  fetchReimbs: (user: User, list: string) => any;
}
class Home extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    this.props.fetchReimbs(this.props.user, "user");
    if (this.props.user.roleId === 1) {
      console.log(this.props.user.roleId);
      return <HomeAdmin />;
    } else {
      return <HomeUser />;
    }
  }
}
const mapStateToProps = (state: IState) => {
  return { user: state.userReimb.user };
};
const mapDispatchToProps = { fetchReimbs, updateScreen };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
