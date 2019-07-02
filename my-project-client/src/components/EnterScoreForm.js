import React, { Component } from "react";
const holesURL = "http://localhost:3000/api/v1/holes";

class EnterScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      par: "",
      player1: "",
      player2: "",
      player3: "",
      player4: ""
    };
  }
  handleParTextChange = event => {
    this.setState({
      par: event.target.value
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
    // let allScores = this.props.players;
    //
    // let keyScores =
    //
    // let sortedScores = allScores.sort();

    event.preventDefault();
    let holeData = [
      {
        match_id: this.props.matchID,
        hole_number: this.props.holeNum,
        par: this.state.par,
        user: this.props.players[0],
        score: this.state.player1
      },
      {
        match_id: this.props.matchID,
        hole_number: this.props.holeNum,
        par: this.state.par,
        user: this.props.players[1],
        score: this.state.player2
      },
      {
        match_id: this.props.matchID,
        hole_number: this.props.holeNum,
        par: this.state.par,
        user: this.props.players[2],
        score: this.state.player3
      },
      {
        match_id: this.props.matchID,
        hole_number: this.props.holeNum,
        par: this.state.par,
        user: this.props.players[3],
        score: this.state.player4
      }
    ];

    for (let i = 0; i < holeData.length; i++) {
      let player = holeData[i].user;

      let team1 = this.props.team1;
      let team2 = this.props.team2;

      if (team1.includes(player)) {
        holeData[i].team = "1";
      } else {
        holeData[i].team = "2";
      }
    }

    let sortedScores = holeData.sort(function(a, b) {
      return a.score - b.score;
    });

    for (let i = 0; i < sortedScores.length; i++) {
      // no tie, regular scenario, one player has lowest score
      if (
        sortedScores[0].score !== sortedScores[1].score &&
        sortedScores[0].team !== sortedScores[1].team
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team == winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager)
          : (sortedScores[i].outcome = this.props.tallyWager * -1);
        // first and second player are on same team2
      } else if (
        sortedScores[0].score == sortedScores[1].score &&
        sortedScores[0].team == sortedScores[1].team
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team = winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager)
          : (sortedScores[i].outcome = this.props.tallyWager * -1);
      } else {
        // tie
        sortedScores[i].outcome = 0;
      }
    }

    let finalScores = sortedScores.map(player => {
      return {
        match_id: parseInt(player.match_id),
        hole_number: parseInt(player.hole_number),
        par: parseInt(player.par),
        user: player.user.username,
        score: parseInt(player.score),
        outcome: parseInt(player.outcome)
      };
    });
    finalScores.forEach(score => {
      fetch(holesURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(score)
      });
    });

    this.props.onScoreSubmit(sortedScores);
  };

  render() {
    return (
      <form className="score-form" onSubmit={this.handleSubmit}>
        <label>Par</label>
        <input
          type="text"
          placeholder="Enter the Par from Scorecard..."
          value={this.state.par}
          onChange={this.handleParTextChange}
        />
        <br />

        <label>{this.props.players[0].username}</label>
        <input
          type="text"
          placeholder={`${this.props.players[0].username}'s score...'`}
          value={this.state.player1}
          onChange={this.handleP1TextChange}
        />
        <br />
        <label>{this.props.players[1].username}</label>
        <input
          type="text"
          placeholder={`${this.props.players[1].username}'s score...'`}
          value={this.state.player2}
          onChange={this.handleP2TextChange}
        />
        <br />
        <label>{this.props.players[2].username}</label>
        <input
          type="text"
          placeholder={`${this.props.players[2].username}'s score...'`}
          value={this.state.player3}
          onChange={this.handleP3TextChange}
        />
        <br />
        <label>{this.props.players[3].username}</label>
        <input
          label={this.props.players[3].username}
          type="text"
          placeholder={`${this.props.players[3].username}'s score...'`}
          value={this.state.player4}
          onChange={this.handleP4TextChange}
        />

        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
export default EnterScoreForm;
