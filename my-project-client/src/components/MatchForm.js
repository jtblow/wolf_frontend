import React, { Component } from "react";
const matchURL = "http://localhost:3000/api/v1/matches";

class MatchForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course_name: "",
      player1: this.props.signedInUser.username,
      player2: null,
      player3: null,
      player4: null,
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
      <div className="match-form">
        <h3>Enter Your Players and Set Wager For Match</h3>
        <br />
        <form onSubmit={this.handleSubmit}>
          <input
            className="FormInput"
            type="text"
            placeholder="Course Name..."
            value={this.state.course_name}
            onChange={this.handleCourseTextChange}
          />
          <br />
          <input
            className="FormInput"
            type="text"
            value={this.props.signedInUser.username}
            readonly
          />
          <br />
          <input
            className="FormInput"
            type="text"
            placeholder="Player 2..."
            value={this.state.player2}
            onChange={this.handleP2TextChange}
          />
          <br />
          <input
            className="FormInput"
            type="text"
            placeholder="Player 3..."
            value={this.state.player3}
            onChange={this.handleP3TextChange}
          />
          <br />
          <input
            className="FormInput"
            type="text"
            placeholder="Player 4..."
            value={this.state.player4}
            onChange={this.handleP4TextChange}
          />
          <br />
          <input
            className="FormInput"
            type="text"
            placeholder="Wager (per player, per hole)..."
            value={this.state.wager}
            onChange={this.handleWagerTextChange}
          />
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
export default MatchForm;
