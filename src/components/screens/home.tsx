import { IState } from "../../reducers";
import { connect } from "react-redux";

import * as React from "react";

class Home extends React.Component {
  public render() {
    return <div>Home has been reached</div>;
  }
}

const mapStateToProps = (state: IState) => state.screen;

export default connect(mapStateToProps)(Home);
