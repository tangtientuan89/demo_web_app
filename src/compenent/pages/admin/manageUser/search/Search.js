import React, { Component } from "react";
export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textSearch: "",
    };
  }
  handleTextSearch = (event) => {
    this.setState({ textSearch: event.target.value });
    console.log(event.target.value);
    this.props.getTextSearch(this.state.textSearch);
  };
  render() {
    return (
      <div className="search">
        <input
          id="search"
          type="text"
          onChange={(event) => {
            this.handleTextSearch(event);
          }}
        />
        <button
          id="btn-search"
          onClick={() => {
            this.props.getTextSearch(this.state.textSearch);
            this.props.reloadTable()
          }}
        >
          Search
        </button>
      </div>
    );
  }
}
