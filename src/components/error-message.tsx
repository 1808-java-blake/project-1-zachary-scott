import { IState } from "../reducers";
import { connect } from "react-redux";

import * as React from "react";

interface IProps {
  error: string;
}
class ErrorMessage extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
  }

  public render() {
    return <p id="errorMessage">{this.props.error}</p>;
  }
}
const mapStateToProps = (state: IState) => {
  return { error: state.screen.errorMessage };
};

export default connect(
  mapStateToProps,
  null
)(ErrorMessage);
