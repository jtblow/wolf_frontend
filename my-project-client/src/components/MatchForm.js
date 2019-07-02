import React, { Component } from "react";
const matchURL = "http://localhost:3000/api/v1/matches";

class MatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_name: "",
      player1: this.props.signedInUser.username,
      player2: "",
      player3: "",
      player4: "",
      wager: "",
      matchID: ""
    };
  }
  handleCourseTextChange = event => {
    this.setState({
      course_name: event.target.value
    });
  };
  handleP1TextChange = event => {
    this.setState({
      player1: event.target.value
    });
  };
  handleP2TextChange = event => {
    this.setState({
      player2: event.target.value
    });
  };
  handleP3TextChange = event => {
    this.setState({
      player3: event.target.value
    });
  };
  handleP4TextChange = event => {
    this.setState({
      player4: event.target.value
    });
  };
  handleWagerTextChange = event => {
    this.setState({
      wager: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let matchData = {
      course_name: this.state.course_name,
      wager: this.state.wager
    };
    fetch(matchURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(matchData)
    })
      .then(resp => resp.json())
      .then(resp => {
        this.setState({
          matchID: resp.id
        });
      })
      .then(resp => this.props.onMatchSubmit(this.state));
    event.target.reset();
  };

  render() {
    return (
      <form className="match-form" onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Course Name..."
          value={this.state.course_name}
          onChange={this.handleCourseTextChange}
        />
        <br />
        <input
          type="text"
          value={this.props.signedInUser.username}
          onChange={this.handleP1TextChange}
        />
        <br />
        <input
          type="text"
          placeholder="Player 2..."
          value={this.state.player2}
          onChange={this.handleP2TextChange}
        />
        <br />
        <input
          type="text"
          placeholder="Player 3..."
          value={this.state.player3}
          onChange={this.handleP3TextChange}
        />
        <br />
        <input
          type="text"
          placeholder="Player 4..."
          value={this.state.player4}
          onChange={this.handleP4TextChange}
        />
        <br />
        <input
          type="text"
          placeholder="Wager (per player, per hole)..."
          value={this.state.wager}
          onChange={this.handleWagerTextChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default MatchForm;
