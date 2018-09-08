import { Reimb } from "../models/reimb";
import * as React from "react";
import { IState } from "../reducers/index";
import { getCurrReimbs } from "../actions/home/home.actions";
import { connect } from "react-redux";
import { updateScreen } from "../actions/screen/screen.actions";
interface IProps {
  reimbs: Reimb[];
  updateScreen: (url: string) => any;
  getCurrReimbs: (reimbs: Reimb[], status: number) => any;
}

class StatusMenu extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.getCurrReimb1 = this.getCurrReimb1.bind(this);
    this.getCurrReimb2 = this.getCurrReimb2.bind(this);
    this.getCurrReimb3 = this.getCurrReimb3.bind(this);
  }

  public getCurrReimb1(e: any) {
    console.log("this is being fired");
    this.props.getCurrReimbs(this.props.reimbs, 1);
    this.props.updateScreen("/home");
  }
  public getCurrReimb2(e: any) {
    console.log("this is being fired");
    this.props.getCurrReimbs(this.props.reimbs, 2);
    this.props.updateScreen("/home");
  }
  public getCurrReimb3(e: any) {
    console.log("this is being fired");
    this.props.getCurrReimbs(this.props.reimbs, 3);
    this.props.updateScreen("/home");
  }

  public render() {
    return (
      <div className="btn-group dropright">
        <button
          type="button"
          className="btn btn-secondary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Filter Reimbursements
        </button>
        <div className="dropdown-menu">
          <button
            onClick={this.getCurrReimb1}
            className="dropdown-item"
            type="button"
          >
            Pending
          </button>
          <button
            onClick={this.getCurrReimb2}
            className="dropdown-item"
            type="button"
          >
            Approved
          </button>

          <button
            onClick={this.getCurrReimb3}
            className="dropdown-item"
            type="button"
          >
            Denied
          </button>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return { reimbs: state.userReimb.reimbList };
};
const mapDispatchToProps = { updateScreen, getCurrReimbs };
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StatusMenu);
