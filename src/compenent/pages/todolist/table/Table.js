import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./table.css";
export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      offset: 0,
      perPage: 5,
      currentPage: 0,
      reloadTable: false,
    };
    this.handlePageClick = this.handlePageClick.bind(this);
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
  deleteData = (id) => {
    this.props.deleteData(id);
  };
  editData = (data) => {
    this.props.editData(data);
  };
  receivedData = () => {
    const data = this.props.data();
    console.log("object", data);
    data.then((data) => {
      console.log("data", data);
      const slice = data.slice(
        this.state.offset,
        this.state.offset + this.state.perPage
      );
      const postData = slice.map((element, index) => (
        <React.Fragment>
          <tr className="row m-0">
            <td className="col-4">{element.title}</td>
            <td className="col-5"> {element.content}</td>
            <td className="col-3">
              <div className="d-flex justify-content-center">
                <button
                  className="m-2 btn-warning text-dark"
                  type="button"
                  onClick={() => {
                    this.editData(element);
                    this.props.showFormEdit();
                  }}
                >
                  Edit
                </button>
                <button
                  className=" m-2 btn-danger"
                  type="button"
                  onClick={() => {
                    this.deleteData(element._id);
                  }}
                >
                  Delete
                </button>
              </div>
            </td>
          </tr>
        </React.Fragment>
      ));
      this.setState({
        pageCount: Math.ceil(data.length / this.state.perPage),
        postData,
      });
    });
  };
  handlePageClick = (e) => {
    const selectedPage = e.selected;
    const offset = selectedPage * this.state.perPage;
    this.setState(
      {
        currentPage: selectedPage,
        offset: offset,
      },
      () => {
        this.receivedData();
      }
    );
  };

  componentDidMount() {
    this.receivedData();
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.reloadTable !== this.state.reloadTable) {
      this.receivedData();
      this.reloadTable();
    }
  }
  render() {
    return (
      <div className="">
        <table
          className="table table-sm table-striped table-dark table-bordered table-hover"
          style={{ height: "60vh"}}
        >
          <thead>
            <tr className="row m-0 py-2 text-center h4">
              <th className="col-4">Title</th>
              <th className="col-5">Content</th>
              <th className="col-3">Handle</th>
            </tr>
          </thead>
          <tbody>{this.state.postData}</tbody>
        </table>
        <div>
          <ReactPaginate
            previousLabel={"prev"}
            nextLabel={"next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={this.state.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={this.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    );
  }
}
