import { Reimb } from "../models/reimb";
import * as React from "react";
import { changeStatus } from "../actions/home/home.actions";
import { connect } from "react-redux";
import { updateScreen } from "../actions/screen/screen.actions";
interface IProps {
  changeStatus: (newReimbs: Reimb[], id: number, status: number) => any;
  idVal: number;
  reimbs: Reimb[];
  currStatus: string;
  updateScreen: (url: string) => any;
}

class StatusMenu extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.changeStatus1 = this.changeStatus1.bind(this);
    this.changeStatus2 = this.changeStatus2.bind(this);
    this.changeStatus3 = this.changeStatus3.bind(this);
  }

  public changeStatus1(e: any) {
    console.log("this is being fired");
    this.props.changeStatus(this.props.reimbs, this.props.idVal, 1);
    this.props.updateScreen("/home");
  }
  public changeStatus2(e: any) {
    console.log("this is being fired");
    this.props.changeStatus(this.props.reimbs, this.props.idVal, 2);
    this.props.updateScreen("/home");
  }
  public changeStatus3(e: any) {
    console.log("this is being fired");
    this.props.changeStatus(this.props.reimbs, this.props.idVal, 3);
    this.props.updateScreen("/home");
  }

  public render() {
    return (
      <div className="btn-group btn-small dropright">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Status: {this.props.currStatus}
        </button>
        <div className="dropdown-menu">
          <button
            onClick={this.changeStatus1}
            className="dropdown-item"
            type="button"
          >
            Pending
          </button>
          <button
            onClick={this.changeStatus2}
            className="dropdown-item"
            type="button"
          >
            Approved
          </button>

          <button
            onClick={this.changeStatus3}
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

const mapDispatchToProps = { updateScreen, changeStatus };
export default connect(
  null,
  mapDispatchToProps
)(StatusMenu);
