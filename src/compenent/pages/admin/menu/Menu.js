import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Switch } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

class MenuAdmin extends React.Component {
  state = {
    theme: "dark",
    current: "1",
  };

  handleClick = (e) => {
    console.log("click ", e);
    this.setState({
      current: e.key,
    });
  };
  handleClickBtnManageUser = (e) => {
    // e.preventDefault();
    this.props.manageUserShow();
    console.log(this.props.manageUser);
  };
  render() {
    return (
      <Menu
        theme={this.state.theme}
        onClick={this.handleClick}
        defaultOpenKeys={["sub1"]}
        selectedKeys={[this.state.current]}
        mode="inline"
        style={{ width: "auto", height: "80vh" }}
      >
        <SubMenu key="sub1" icon={<MailOutlined />} title="Manager Users">
          <Menu.Item key="1" onClick={(e) => this.handleClickBtnManageUser(e)}>
            Manage Users
          </Menu.Item>
          <Menu.Item key="2">Option 2</Menu.Item>
          <Menu.Item key="3">Option 3</Menu.Item>
          <Menu.Item key="4">Option 4</Menu.Item>
        </SubMenu>
        <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Navigation Two">
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
        <SubMenu key="sub4" icon={<SettingOutlined />} title="Navigation Three">
          <Menu.Item key="9">Option 9</Menu.Item>
          <Menu.Item key="10">Option 10</Menu.Item>
          <Menu.Item key="11">Option 11</Menu.Item>
          <Menu.Item key="12">Option 12</Menu.Item>
        </SubMenu>
      </Menu>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    manageUserShow: () => {
      dispatch({ type: "MANAGEUSER_SHOW" });
    },
    manageUserHide: () => {
      dispatch({ type: "MANAGEUSER_HIDE" });
    },
  };
};
const mapStateToProps = (state, ownProps) => {
  return {
    manageUser: state.admin.manageUser,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuAdmin);
