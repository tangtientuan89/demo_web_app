import React, { Component } from "react";

export default class FormEditTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      title: "",
      content: "",
    };
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({
      _id: nextProps.editData._id,
      title: nextProps.editData.title,
      content: nextProps.editData.content,
    });
  }
  addForm() {
    if (this.props.status) {
      return (
        <div>
          <div className="addNew bg-warning " onClick={this.handleShowFormAdd}>
            <div className="modal-add" id="modal-add">
              <img
                className="icon"
                src="/images/icon/Apps-Dialog-Add-icon.png"
                alt=""
              />
            </div>
            <label htmlFor="modal-add">Edit</label>
          </div>
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
                defaultValue={this.props.editData.title}
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
                defaultValue={this.props.editData.content}
              />
            </div>
            <div className="d-flex justify-content-end align-items-end">
              <button
                type="submit"
                className="text-dark btn-secondary"
                onClick={this.props.showFormEdit}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {
                  this.props.updateEditData(this.state);
                  this.props.showFormEdit();
                }}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      );
    }
  }
  handleTitle = (event) => {
    this.setState({
      title: event.target.value,
    });
  };
  handleContent = (event) => {
    this.setState({
      content: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
  };
  render() {
    return <div>{this.addForm()}</div>;
  }
}
