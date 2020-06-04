import React, { Component } from "react";
import ReactPaginate from "react-paginate";
import "./table.css";
import styled from "styled-components";

const Button = styled.button`
  height: 2.5rem;
  width: 8rem;
  margin-left: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline-style: none;
`;

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
  updateData = (data) => {
    this.props.updateData(data);
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
        <React.Fragment key={index}>
          <tr className="row m-0">
            <td className="col-4 d-flex justify-content-center align-items-center">
              {element.email}
            </td>
            <td className="col-2 d-flex justify-content-center align-items-center">
              {element.verified.toString()}
            </td>
            <td className="col-3 d-flex justify-content-center align-items-center">
              {" "}
              {element.status}
            </td>
            <td className="col-3">
              <div className="d-flex justify-content-center">
                <Button
                  className="m-2 btn-primary"
                  type="button"
                  onClick={() => {
                    this.updateData({
                      _id: element._id,
                      status: "actived",
                    });
                  }}
                >
                  Active
                </Button>
                <Button
                  className="m-2 btn-warning text-dark"
                  type="button"
                  onClick={() => {
                    this.updateData({
                      _id: element._id,
                      status: "blocked",
                    });
                  }}
                >
                  Block
                </Button>
                <Button
                  className="m-2 btn-danger"
                  type="button"
                  onClick={() => {
                    this.deleteData(element._id);
                  }}
                >
                  Delete
                </Button>
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
  componentWillReceiveProps(nextProps) {
    if (nextProps.reloadTable !== this.state.reloadTable) {
      this.receivedData();
      this.reloadTable();
    }
  }
  render() {
    return (
      <div className="">
        <table className="table table-sm table-striped table-dark table-bordered table-hover">
          <thead>
            <tr className="row m-0 py-2 text-center h4">
              <th className="col-4">Account</th>
              <th className="col-2">Verified</th>
              <th className="col-3">Status</th>
              <th className="col-3">Handle</th>
            </tr>
          </thead>

          <tbody>
            <div style={{ height: "300px", overflowY: "scroll" }}>
              {this.state.postData}
            </div>
          </tbody>
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
