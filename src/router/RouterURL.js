import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "../compenent/pages/home/Home";
import Login from "../compenent/pages/auth/login/Login";
import Register from "../compenent/pages/auth/register/Register";
import Todolist from "../compenent/pages/todolist/Todolist";
import Admin from "../compenent/pages/admin/index";
import NewsHome from "../compenent/pages/news/home/NewsHome"
import ShopHome from "../compenent/pages/shop/ShopHome";
export default class router extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
        <Route path="/to-do-list" exact component={Todolist} />
        <Route path="/admin" exact component={Admin}/>
        <Route path="/news" exact component={NewsHome}/>
        <Route path="/shop" exact component={ShopHome}/>
      </Switch>
    );
  }
}
