import * as React from "react";
import { attemptLogin } from "../../actions/login/login.actions";
import {
  updateUsername,
  updatePassword
} from "../../actions/login/login.actions";
import { connect } from "react-redux";
import { IState } from "../../reducers/index";

interface IProps {
  attemptLogin: (username: string, password: string) => any;
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
    this.props.attemptLogin(this.props.username, this.props.password);
  }

  public render() {
    console.log(this);
    return (
      <form className="Login" onSubmit={this.attemptLogin}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={this.changeUsername}
            value={this.props.username}
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll ALWAYS share your email with anyone we feel like.
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Enter password"
            onChange={this.changePassword}
            value={this.props.password}
          />
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label">Check me out</label>
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
  attemptLogin,
  updatePassword,
  updateUsername
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
