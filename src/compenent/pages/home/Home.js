import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import "./home.scss";
import { connect } from "react-redux";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthentication: false,
      text1: "",
      text2: "",
      btn: "",
    };
  }

  animation = () => {
    let text = "WELLCOME";
    let arrText = [];

    for (var i = 0; i < text.length; i++) {
      arrText.push(text[i]);
    }
    let newText = "";
    arrText.forEach((element, index) => {
      setTimeout(() => {
        this.setState({ text1: newText + element });
        newText = newText + element;
      }, 200 * (index + 1));
    });
    ////////////////////
    setTimeout(() => {
      this.setState({
        text2: "Please login or register to use Web application",
      });
    }, 1800);
    ///////////////
    setTimeout(() => {
      this.setState({
        btn: (
          <div>
            <Link to="/login">
              <button className="btn home__content--btn-login">Login</button>
            </Link>
            <Link to="/register">
              <button className="btn home__content--btn-register">
                Register
              </button>
            </Link>
          </div>
        ),
      });
    }, 2800);
  };
  data = () => {
    if (this.props.isLogin) {
      return (
        <div className="home__content">
          <p className="home__content--text--larger">WELLCOME</p>
          <Link to="/to-do-list">click here</Link>
        </div>
      );
    } else {
      return (
        <div className="home-container">
          <svg
            className="pulse"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <circle id="Oval" cx={512} cy={512} r={512} />
            <circle id="Oval" cx={512} cy={512} r={512} />
            <circle id="Oval" cx={512} cy={512} r={512} />
          </svg>
          <div className="home__content">
            <p className="home__content--text--larger">{this.state.text1}</p>
            <p className="home__content--text--medium">{this.state.text2}</p>
            <div className="home__content--button">{this.state.btn}</div>
          </div>
        </div>
      );
    }
  };

  handleIsAuth = () => {
    if (this.props.isLogin) {
    } else {
    }
    this.animation();
  };

  componentDidMount() {
    this.handleIsAuth();
  }
  render() {
    return <div>{this.data()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log(state.auth.isLogin)
  return {
    isLogin: state.auth.isLogin,
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatch1: () => {},
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Home);
