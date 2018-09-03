import * as React from "react";
import { IState } from "../../../reducers/index";
import { connect } from "react-redux";
import Login from "../login";
import { updateScreen } from "../../../actions/screen/screen.actions";
import Home from "../home";

interface IProps {
  screenUrl: string;
  updateScreen: (url: string) => any;
}
class ScreenSelector extends React.Component<IProps, any> {
  public render() {
    updateScreen("/login");
    const url = this.props.screenUrl;
    console.log(this.props);
    let currScreen;
    switch (url) {
      case "/login":
        return <Login />;
      case "/home":
        return <Home />;
      case "/submissionScreen":
      // reuturn <Submit />;
      case "approvalScreen":
      // return  <ApprovalScreen/>

      default:
        currScreen = <h1 />;
    }
    console.log(currScreen);
    return <h1>You selected NOT login: {this.props.screenUrl}</h1>;
  }
}
const mapStateToProps = (state: IState) => {
  return {
    screenUrl: state.screen.screenUrl
  };
};
const mapDispatchToProps = {
  updateScreen
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScreenSelector);
