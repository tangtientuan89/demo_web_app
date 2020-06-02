import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./login.scss";
import axios from "axios";
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }
  setCookie = (data, timeExpries) => {
    var newDay = new Date();
    newDay.setTime(timeExpries * 1000 * 60 * 60 * 24 + newDay.getTime());
    document.cookie = `token=${
      data.token
    };expries=${newDay.toUTCString()} ";path=http://localhost:8080/"`;
  };
  handleUserEmail = (event) => {
    this.setState({ email: event.target.value });
  };
  handleUserPassword = (event) => {
    this.setState({ password: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:8080/login",
      data: {
        email: this.state.email,
        password: this.state.password,
      },
    }).then((res) => {
      if (res.data.code == 400) {
        alert(res.data.message.message);
        return (window.location.href = "/login");
      }
      if (res.data.code == 200) {
        this.setCookie(res.data, 1);
        if (res.data.type == 1) {
          return (window.location.href = "/admin");
        }
        window.location.href = "/to-do-list";
      }
    });
  };
  render() {
    return (
      <div className="login-container">
        <form
          className="form-login"
          id="form-login"
          onSubmit={this.handleSubmit}
        >
          <div className="form-login__email">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-login__email--input"
              id="email"
              aria-describedby="emailHelp"
              placeholder="Enter Email"
              name="this.state.email"
              onChange={this.handleUserEmail}
            />
          </div>
          <div className="form-login__email">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-login__email--input"
              id="password"
              placeholder="Password"
              onChange={this.handleUserPassword}
            />
          </div>
          <div className="form-login__checkbox">
            <input
              type="checkbox"
              className="form-login__checkbox-input"
              id="checkbox"
            />
            <label className="form-login__checkbox-label" htmlFor="checkbox">
              Check me out
            </label>
          </div>
          <div className="form-login__forgot-password">
            <a href="/forgot-password">Forgot password</a>
          </div>
          <div className="form-login__btn">
            <button type="submit" className="btn form-login__btn--login">
              Login
            </button>
          </div>
          <Link to="/register">
            <div className="form-login__btn">
              <button type="button" className="form-login__btn--register btn">
                Register
              </button>
            </div>
          </Link>
        </form>
      </div>
    );
  }
}
