import React from "react";
import { BrowserRouter as Router, Switch, Route, NavLink,Link } from "react-router-dom";
import "./header.css";
import { Layout, Menu, Button } from "antd";

const { Header } = Layout;
const header = () => {
  return (
    <div style={{paddingBottom:"64px"}}>
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
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
            <Menu.Item key='1' >
              <Link to="/news" style={{color:"#fff"}} >NEWS</Link>
            </Menu.Item>
            <Menu.Item  key='2'>
              <Link to="/to-do-list" style={{color:"#fff"}} >TO-DO</Link>
            </Menu.Item>
            <Menu.Item  key='3'>
              <Link to="/shop" style={{color:"#fff"}} >SHOP</Link>
            </Menu.Item>
          </Menu>
          <div>
            <Button type="primary" style={{ width: "100%" }}>
              Logout
            </Button>
          </div>
        </Header>
      </Layout>
    </div>
  );
};

export default header;
