import React, { Component } from "react";
import Suggestions from "./Suggestions";

class Search extends Component {
  state = {
    query: "",
    results: [],
    suggestions: true
  };

  getInfo = () => {
    const fetchHeaders = {
      Authorization: `Bearer ` + localStorage.getItem("token")
    };
    fetch(
      "http://localhost:3000/api/v1/users/search_users/" + this.state.query,
      {
        method: "GET",
        headers: fetchHeaders
      }
    )
      .then(resp => resp.json())
      .then(results => this.setState({ results: results }));
  };

  handleSugClick = event => {
    event.preventDefault();
    this.setState({
      query: event.target.innerHTML,
      suggestions: !this.state.suggestions
    });
  };

  handleInputChange = () => {
    this.setState(
      {
        query: this.search.value
      },
      () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo();
          }
        } else if (!this.state.query) {
        }
      }
    );
  };

  handleView = () => {
    if (this.state.suggestions) {
      return (
        <div>
          <input
            placeholder={this.props.placeholder}
            onChange={this.handleInputChange}
            ref={input => (this.search = input)}
            handleTextChange={this.props.handleTextChange}
            value={this.state.query}
            className="FormInput"
          />
          <Suggestions
            handleSugClick={this.handleSugClick}
            results={this.state.results}
            handleTextChange={this.props.handleTextChange}
            name={this.props.name}
          />
        </div>
      );
    } else {
      return (
        <input
          placeholder={this.props.placeholder}
          onChange={this.handleInputChange}
          ref={input => (this.search = input)}
          handleTextChange={this.props.handleTextChange}
          value={this.state.query}
          className="FormInput"
        />
      );
    }
  };

  render() {
    return this.handleView();
  }
}

export default Search;
