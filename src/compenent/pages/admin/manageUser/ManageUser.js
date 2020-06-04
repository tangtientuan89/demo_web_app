import React, { Component } from "react";
import axios from "axios";
import Table from "./table/Table";
import Search from "./search/Search";
import Host from "../../../../config/Host"
// import styled from "styled-components";

// style

export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editData: {},
      showFormAdd: false,
      showFormEdit: false,
      textSearch: "",
      reloadTable: false,
    };
  }
  reloadTable = () => {
    if (this.state.reloadTable) {
      this.setState({
        reloadTable: false,
      });
    } else {
      this.setState({
        reloadTable: true,
      });
    }
  };
  getTextSearch = (text) => {
    /// get text from Search => state textSearch

    this.setState({ textSearch: text });
    console.log("text", this.state.textSearch);
  };
  getData = () => {
    return axios({
      method: "GET",
      url: Host+"/api/admin/?search=" + this.state.textSearch,
      headers: {
        Authorization: `Bearer ${document.cookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        console.log("res", res);
        if (res.data.code == 404) {
          return (window.location.href = "/login");
        }
        this.setState({ data: res.data.data });
        return res.data.data;
      })
      .catch((err) => {
        console.log(err);
      });
  };
  updateData = (data) => {
    console.log("dddddddddd", data);
    return axios({
      method: "PUT",
      url: Host+`/api/admin/?id=${data._id}&status=${data.status}`,
      headers: {
        Authorization: `Bearer ${document.cookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        this.reloadTable();
      })
      .catch((err) => console.log(err));
  };
  deleteData = (id) => {
    console.log("id ", id);
    return axios({
      method: "DELETE",
      url: Host+"/api/admin/?id=" + id,
      headers: {
        Authorization: `Bearer ${document.cookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        this.reloadTable();
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <div>
        <Search
          getTextSearch={(text) => {
            this.getTextSearch(text);
          }}
          reloadTable={this.reloadTable}
        />
        <Table
          data={this.getData}
          updateData={(data) => {
            this.updateData(data);
          }}
          deleteData={(id) => {
            this.deleteData(id);
          }}
          reloadTable={this.state.reloadTable}
        />
      </div>
    );
  }
}
