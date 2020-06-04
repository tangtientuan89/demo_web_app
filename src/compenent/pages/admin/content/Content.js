import React, { Component } from "react";
import { connect } from "react-redux";
import { Layout, Menu, Breadcrumb } from "antd";
import "./content.css";
import ManageUser from '../manageUser/ManageUser'
const { Header, Content, Footer } = Layout;

class ContentAdmin extends React.Component {
  manageUser=()=>{
    if(this.props.manageUser)
    {return  <ManageUser/>}
  
  }
  
  render() {
    return (
      <Layout className="col-12">
        <Content style={{ padding: "0 50px" }}>
          <Breadcrumb style={{ margin: "16px 0" }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>
    <div className="site-layout-content">{this.manageUser()}</div>
        </Content>
      </Layout>
    );
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  };
};
const mapStateToProps = (state, ownProps) => {
  console.log(state.admin)
  return {
    manageUser:state.admin.manageUser
      
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(ContentAdmin);
