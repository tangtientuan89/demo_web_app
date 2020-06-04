import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink,
  Link,
} from "react-router-dom";
import "./header.css";
import { Layout, Menu, Button } from "antd";
import axios from "axios";
import cookie from "react-cookies";
import Host from "../../../config/Host";
import { useSelector, useDispatch } from "react-redux";
const { Header } = Layout;
let handleLogout = () => {
  axios({
    method: "POST",
    url: Host + "/logout",
    headers: {
      Authorization: `Bearer ${document.cookie}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      console.log(res);
      cookie.remove("token");
      cookie.remove("type");
      window.location.href = "/";
    })
    .catch((err) => console.log(err));
};

const HeaderCpn = () => {
  const isAdmin = useSelector((state) => state.admin.isAdmin);
  const isLogin = useSelector((state) => state.auth.isLogin);
  let handleBtnAuth = () => {
    if (isLogin) {
      return (
        <Button type="primary" style={{ width: "100%" }} onClick={handleLogout}>
          Logout
        </Button>
      );
    } else {
      return (
        <Button type="primary" style={{ width: "100%" }}>
           <Link to="/login" style={{ color: "#fff" }}>
            Login
          </Link>
        </Button>
      );
    }
  };
  let handleBtnTodo = () => {
    if (isLogin) {
      return (
        <Menu.Item key="3">
          <Link to="/to-do-list" style={{ color: "#fff" }}>
            TO-DO
          </Link>
        </Menu.Item>
      );
    }
  };

  let handleBtnAdmin = () => {
    if (isAdmin) {
      return (
        <Menu.Item key="4">
          <Link to="/admin" style={{ color: "#fff" }}>
            ADMIN
          </Link>
        </Menu.Item>
      );
    }
  };

  return (
    <div style={{ paddingBottom: "64px" }}>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Link to="/">
            <div className="logo" />
          </Link>
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[""]}>
            <Menu.Item key="1">
              <Link to="/news" style={{ color: "#fff" }}>
                NEWS
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/shop" style={{ color: "#fff" }}>
                SHOP
              </Link>
            </Menu.Item>
            {handleBtnTodo()}
            {handleBtnAdmin()}
          </Menu>
          <div>{handleBtnAuth()}</div>
        </Header>
      </Layout>
    </div>
  );
};

export default HeaderCpn;
