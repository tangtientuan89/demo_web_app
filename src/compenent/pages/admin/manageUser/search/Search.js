import React, { Component } from "react";
import styled from "styled-components"
const Input= styled.input`
height: 2.5rem;
border-color: silver;
border-radius: 5px;
`
const Container= styled.div`
text-align: center;
padding-bottom: 1rem;
`
const Button=styled.button`
background: #007bff;
height: 2.5rem;
width: 8rem;
margin-left: 1rem;
border: none;
border-radius: 5px;
color: white;
cursor: pointer;
outline-style: none;
`

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
      <Container>
        <Input
        className="col-4"
          id="search"
          type="text"
          onChange={(event) => {
            this.handleTextSearch(event);
          }}
        />
        <Button
          id="btn-search"
          onClick={() => {
            this.props.getTextSearch(this.state.textSearch);
            this.props.reloadTable()
          }}
        >
          Search
        </Button>
      </Container>
    );
  }
}
