import React, { Component } from "react";
import UserMatchListing from "./UserMatchListing";
import MatchSummaryView from "./MatchSummaryView";
const url = "http://localhost:3000/api/v1/users/matches/";

class UserMatchList extends Component {
  constructor() {
    super();
    this.state = {
      userMatches: [],
      view: "MatchList",
      match: ""
    };
  }

  componentDidMount() {
    fetch(url + this.props.signedInUser.userID)
      .then(resp => resp.json())
      .then(matches => this.renderListings(matches));
  }

  handleMatchClick = id => {
    this.setState({
      match: id,
      view: "MatchSummaryView"
    });
  };
  handleBackClick = event => {
    event.preventDefault();
    this.setState({ view: "MatchList" });
  };

  renderListings = matches => {
    let userMatches = matches.map(match => {
      return (
        <UserMatchListing
          matchListing={match}
          key={match.id}
          className="MatchListing"
          handleMatchClick={this.handleMatchClick}
        />
      );
    });
    this.setState({ userMatches: userMatches });
  };

  renderController = () => {
    if (this.state.view === "MatchList") {
      return this.state.userMatches;
    } else {
      return (
        <div>
          <MatchSummaryView match={this.state.match} />;
          <div handleBackClick={event => this.handleBackClick(event)}>Back</div>
        </div>
      );
    }
  };

  render() {
    return this.renderController();
  }
}

export default UserMatchList;
