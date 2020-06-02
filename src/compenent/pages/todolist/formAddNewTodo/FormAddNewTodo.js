import React, { Component } from "react";
export default class FormAddNewTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
  }
  addForm() {
    if (this.props.status) {
      return (
        <form className="bg-light" onSubmit={this.handleSubmit}>
          <div className="form-group px-4">
            <label htmlFor="title" className="text-light">
              Title
            </label>
            <input
              type="text"
              className="form-control "
              id="title"
              aria-describedby="emailHelp"
              placeholder="Title"
              onChange={(e) => this.handleTitle(e)}
            />
          </div>
          <div className="form-group px-4">
            <label htmlFor="content" className="text-light">
              Content
            </label>
            <input
              type="text"
              className="form-control"
              id="content"
              placeholder="Content"
              onChange={(e) => this.handleContent(e)}
            />
          </div>
          <div className="d-flex justify-content-end align-items-end">
            <button
              type="submit"
              className="text-dark btn-secondary"
              onClick={this.props.showFormAdd}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => {
                this.props.addData(this.state.title, this.state.content);
                this.props.showFormAdd();
                this.clearState();
              }}
            >
              Save
            </button>
          </div>
        </form>
      );
    }
  }
  handleTitle = (event) => {
    this.setState({ title: event.target.value });
  };
  handleContent = (event) => {
    this.setState({ content: event.target.value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  clearState = () => {
    this.setState({ title: "", content: "" });
  };
  render() {
    return <div>{this.addForm()}</div>;
  }
}
