import * as React from "react";
import { fetchLogin } from "../../actions/fetch/fetch.actions";
import { fetchReimbs } from "../../actions/fetch/fetch.actions";

import {
  updateUsername,
  updatePassword
} from "../../actions/login/login.actions";
import { connect } from "react-redux";
import { IState } from "../../reducers";
import "../../App.css";

interface IProps {
  fetchLogin: (username: string, password: string) => any;
  password: string;
  updatePassword: (password: string) => any;
  updateUsername: (username: string) => any;
  username: string;
}
class Login extends React.Component<IProps, any> {
  constructor(props: any) {
    super(props);
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.attemptLogin = this.attemptLogin.bind(this);
    console.log(this.props);
  }

  public changeUsername(e: any) {
    e.preventDefault();
    this.props.updateUsername(e.target.value);
  }

  public changePassword(e: any) {
    e.preventDefault();
    this.props.updatePassword(e.target.value);
  }

  public attemptLogin(e: any) {
    e.preventDefault();
    this.props.fetchLogin(this.props.username, this.props.password);
  }

  public render() {
    console.log(this);
    return (
      <form className="Login" onSubmit={this.attemptLogin}>
        <img
          src="https://i.imgur.com/IQAbYjt.png"
          alt="https://i.imgur.com/JE0XRiP.png"
        />
        <br />
        <i>refreshingly simple compensation</i>
        <div className="form-group">
          <label>Username</label>
          <input
            type="username"
            className="form-control"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={this.changeUsername}
            value={this.props.username}
          />
          <small id="emailHelp" className="form-text text-muted" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={this.changePassword}
            value={this.props.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    );
  }
}
const mapStateToProps = (state: IState) => {
  return {
    password: state.login.password,
    username: state.login.username
  };
};
const mapDispatchToProps = {
  fetchLogin,
  fetchReimbs,
  updatePassword,
  updateUsername
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
