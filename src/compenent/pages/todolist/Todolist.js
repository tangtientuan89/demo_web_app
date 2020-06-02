import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import "./todolist.scss";
import axios from "axios";
import Search from "./search/Search";
import Table from "./table/Table";
import FormAddNewTodo from "./formAddNewTodo/FormAddNewTodo";
import FormEditTodo from "./formEditTodo/FormEditTodo";

export default class Todolist extends Component {
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
  getTextSearch =  (text) => {
    /// get text from Search => state textSearch

   this.setState({ textSearch: text });
    console.log("text", this.state.textSearch);
  };
 
  //
  handleShowFormAdd = () => {
    if (this.state.showFormAdd)
      this.setState({
        showFormAdd: false,
      });
    else {
      this.setState({
        showFormAdd: true,
      });
    }
  };
  handleShowFormEdit = () => {
    if (this.state.showFormEdit)
      this.setState({
        showFormEdit: false,
      });
    else {
      this.setState({
        showFormEdit: true,
      });
    }
  };
   //Add
   addData = (title, content) => {
    const data = {
      title: title,
      content: content,
    };
    console.log(data);
    return axios({
      method: "POST",
      url: "http://localhost:8080/api/to-do-list/",
      data: data,
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
  //delete
  deleteData = (id) => {
    console.log("id ", id);
    return axios({
      method: "DELETE",
      url: "http://localhost:8080/api/to-do-list/?id=" + id,
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
  editData = (data) => {
    console.log("id title content ", data);
    this.setState({
      editData: {
        _id: data._id,
        title: data.title,
        content: data.content,
      },
    });
  };
  // Search
  updateEditData = (data) => {
    console.log("dddddddddd", data);
 
    return axios({
      method: "PUT",
      url: "http://localhost:8080/api/to-do-list/?id=" + data._id,
      data: {
        title: data.title,
        content: data.content,
      },
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

  getData = () => {
    return axios({
      method: "GET",
      url:
        "http://localhost:8080/api/to-do-list/?search=" +
        this.state.textSearch,
      headers: {
        Authorization: `Bearer ${document.cookie}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
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

  componentDidMount() {
    this.getData();
  }
  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.textSearch !== nextState.textSearch) {
  //     this.getData();
  //   }
  //   return this.state.textSearch == nextState.textSearch;
  // }
  render() {
    return (
      <div className="to-do-list">
        <div className="container">
          <Search
            getTextSearch={(text) => {
              this.getTextSearch(text);
              this.getData();
            }}
            reloadTable={this.reloadTable}
          />
          <div className="addNew" onClick={this.handleShowFormAdd}>
            <div className="modal-add" id="modal-add">
              <img
                className="icon"
                src="/images/icon/Apps-Dialog-Add-icon.png"
                alt=""
              />
            </div>
            <label htmlFor="modal-add">Add New</label>
          </div>
          <FormAddNewTodo
            showFormAdd={this.handleShowFormAdd}
            status={this.state.showFormAdd}
            addData={(title, content) => {
              this.addData(title, content);
            }}
          />
          <FormEditTodo
            status={this.state.showFormEdit}
            showFormEdit={this.handleShowFormEdit}
            editData={this.state.editData}
            updateEditData={(data) => {
              this.updateEditData(data);
            }}
          />
          <Table
            data={this.getData}
            deleteData={(id) => {
              this.deleteData(id);
            }}
            editData={(data) => {
              this.editData(data);
            }}
            showFormEdit={this.handleShowFormEdit}
            reloadTable={this.state.reloadTable}
          />
        </div>
      </div>
    );
  }
}
