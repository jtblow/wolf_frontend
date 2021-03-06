import React, { Component } from "react";
import Search from "./Search";
import Suggestions from "./Suggestions";
const matchURL = "http://localhost:3000/api/v1/matches";
const token = localStorage.getItem("token");

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

  handleTextChange = event => {
    console.log(event.currentTarget.dataset.value);
    switch (event.currentTarget.dataset.value) {
      case "Player2":
        this.setState({
          player2: event.target.innerText
        });
        break;
      case "Player3":
        this.setState({
          player3: event.target.innerText
        });
        break;
      case "Player4":
        this.setState({
          player4: event.target.innerText
        });
        break;
    }
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
    const fetchHeaders = {
      Authorization: `Bearer ` + localStorage.getItem("token"),
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    fetch(matchURL, {
      method: "POST",
      headers: fetchHeaders,
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

          <Search
            placeholder={"Player2..."}
            name="Player2"
            handleTextChange={this.handleTextChange}
          />

          <Search
            placeholder={"Player3..."}
            name="Player3"
            handleTextChange={this.handleTextChange}
          />

          <Search
            placeholder={"Player4..."}
            name="Player4"
            handleTextChange={this.handleTextChange}
          />
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
