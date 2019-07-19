import React, { Component } from "react";
import "../App.css";
import Collapsible from "react-collapsible";

import PlayerScoreButtons from "./PlayerScoreButtons";
import Player2ScoreButtons from "./Player2ScoreButtons";
import Player3ScoreButtons from "./Player3ScoreButtons";
import Player4ScoreButtons from "./Player4ScoreButtons";
import Player1ScoreContainer from "./Player1ScoreContainer";
import Player2ScoreContainer from "./Player2ScoreContainer";
import Player3ScoreContainer from "./Player3ScoreContainer";
import Player4ScoreContainer from "./Player4ScoreContainer";

const holesURL = "http://localhost:3000/api/v1/holes";
const imgURL =
  "https://i.ibb.co/p1ywxbZ/Depositphotos-4815325-s-2015-1024x1024.png";

let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class EnterScoreForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      par: "",
      player1: "",
      player2: "",
      player3: "",
      player4: "",
      selectedButtons: [],
      selectedPlayer: ""
    };
  }
  handleParChange = event => {
    this.setState({
      par: event.target.value
    });
  };
  handleP1TextChange = event => {
    event.preventDefault();

    this.setState({
      player1: event.target.value
    });
  };
  handleP2TextChange = event => {
    event.preventDefault();

    this.setState({
      player2: event.target.value
    });
  };
  handleP3TextChange = event => {
    event.preventDefault();
    this.setState({
      player3: event.target.value
    });
  };
  handleP4TextChange = event => {
    event.preventDefault();
    this.setState({
      player4: event.target.value
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
      // if (this.props.team1.length == 1) {
      //
      // }

      // if (this.props.team1.length == 1) {
      //   if (sortedScores[0].score !==)
      // }
      if (
        sortedScores[0].score !== sortedScores[1].score &&
        sortedScores[0].team !== sortedScores[1].team &&
        this.props.team1.length == 1
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team == winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager * 3)
          : (sortedScores[i].outcome = this.props.tallyWager * -1);
        // first and second player are on same team2
      } else if (
        sortedScores[0].score !== sortedScores[1].score &&
        sortedScores[0].team !== sortedScores[1].team &&
        this.props.team1.length == 2
      ) {
        let winningTeam = sortedScores[0].team;

        sortedScores[i].team == winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager)
          : (sortedScores[i].outcome = this.props.tallyWager * -1);
      } else if (
        sortedScores[0].score <= sortedScores[1].score &&
        sortedScores[0].team == sortedScores[1].team &&
        this.props.team1.length == 1
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team == winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager)
          : (sortedScores[i].outcome = this.props.tallyWager * -3);
      } else if (
        sortedScores[0].score <= sortedScores[1].score &&
        sortedScores[0].team == sortedScores[1].team &&
        this.props.team1.length == 2
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team == winningTeam
          ? (sortedScores[i].outcome = this.props.tallyWager)
          : (sortedScores[i].outcome = this.props.tallyWager * -1);
      } else if (
        sortedScores[0].score <= sortedScores[1].score &&
        sortedScores[0].team == sortedScores[1].team &&
        this.props.team1.length == 2 &&
        sortedScores[0].score !== sortedScores[3].score
      ) {
        let winningTeam = sortedScores[0].team;
        sortedScores[i].team == winningTeam
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

  // renderPlayer1ScoreButtons = () => {
  //   let p1Buttons = numArray.map(num => {
  //     return (
  //       <PlayerScoreButtons
  //         key={num}
  //         ref={"Player1Num" + num}
  //         num={num}
  //         selectedNumber={this.state.player1}
  //         handleP1TextChange={this.handleP1TextChange}
  //       />
  //     );
  //   });
  //   return p1Buttons;
  // };
  renderPlayer2ScoreButtons = () => {
    let p2Buttons = numArray.map(num => {
      return (
        <Player2ScoreButtons
          key={num}
          num={num}
          selectedNumber={this.state.player2}
          handleP2TextChange={this.handleP2TextChange}
        />
      );
    });
    return p2Buttons;
  };
  renderPlayer3ScoreButtons = () => {
    let p3Buttons = numArray.map(num => {
      return (
        <Player3ScoreButtons
          key={num}
          num={num}
          selectedNumber={this.state.player3}
          handleP3TextChange={this.handleP3TextChange}
        />
      );
    });
    return p3Buttons;
  };

  renderPlayer4ScoreButtons = () => {
    let p4Buttons = numArray.map(num => {
      return (
        <Player4ScoreButtons
          key={num}
          num={num}
          selectedNumber={this.state.player4}
          handleP4TextChange={this.handleP4TextChange}
        />
      );
    });
    return p4Buttons;
  };

  handlePlayerClick = event => {
    event.preventDefault();
    console.log(event.target.innerText);
    this.setState({ selectedPlayer: event.target.innerText });
  };

  // renderController = () => {
  //   switch (this.state.selectedPlayer) {
  //     case expression:
  //       break;
  //     default:
  //   }
  //   if (this.state.selectedPlayer == this.props.players[0].username) {
  //     return this.renderPlayer1ScoreButtons();
  //   }
  // };

  render() {
    return (
      <div>
        <div />

        <div className="score-form">
          <form onSubmit={this.handleSubmit}>
            <select
              className="custom-select"
              id="par-select"
              onChange={this.handleParChange}
            >
              <option value="">Select Par</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
            <br />
            <br />
            <div>
              <Player1ScoreContainer
                handleP1TextChange={this.handleP1TextChange}
                selectedNumber={this.state.player1}
                players={this.props.players}
                selectedPlayer={this.state.selectedPlayer}
                handlePlayerClick={this.handlePlayerClick}
              />
            </div>
            <div>
              <Player2ScoreContainer
                handleP2TextChange={this.handleP2TextChange}
                selectedNumber={this.state.player2}
                players={this.props.players}
                selectedPlayer={this.state.selectedPlayer}
                handlePlayerClick={this.handlePlayerClick}
              />
            </div>
            <div>
              <Player3ScoreContainer
                handleP3TextChange={this.handleP3TextChange}
                selectedNumber={this.state.player3}
                players={this.props.players}
                selectedPlayer={this.state.selectedPlayer}
                handlePlayerClick={this.handlePlayerClick}
              />
            </div>
            <div>
              <Player4ScoreContainer
                handleP4TextChange={this.handleP4TextChange}
                selectedNumber={this.state.player4}
                players={this.props.players}
                selectedPlayer={this.state.selectedPlayer}
                handlePlayerClick={this.handlePlayerClick}
              />
            </div>

            <br />

            <input type="submit" value="Submit" />
          </form>
        </div>
      </div>
    );
  }
}
export default EnterScoreForm;
