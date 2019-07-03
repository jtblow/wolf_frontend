import React, { Component } from "react";
import UserMatchListing from "./UserMatchListing";
const url = "http://localhost:3000/api/v1/users/matches/";

class UserMatchList extends Component {
  constructor() {
    super();
    this.state = {
      userMatches: []
    };
  }

  componentDidMount() {
    fetch(url + this.props.signedInUser.userID)
      .then(resp => resp.json())
      .then(matches => this.renderListings(matches));
  }

  renderListings = matches => {
    let userMatches = matches.map(match => {
      return (
        <UserMatchListing
          matchListing={match}
          key={match.id}
          value={match.id}
          handleMatchClick={this.handleMatchClick}
        />
      );
    });
    this.setState({ userMatches: userMatches });
  };

  render() {
    return <div>{this.state.userMatches}</div>;
  }
}

export default UserMatchList;
