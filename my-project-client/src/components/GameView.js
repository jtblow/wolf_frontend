import React, { Component } from "react";
import MatchForm from "./MatchForm";
import BeginRoundButton from "./BeginRoundButton";
import PlayerCardContainer from "./PlayerCardContainer";
import WolfButtons from "./WolfButtons";
import EnterScoreButton from "./EnterScoreButton";
import EnterScoreForm from "./EnterScoreForm";
import MatchSummaryView from "./MatchSummaryView";
import MatchSummaryButton from "./MatchSummaryButton";
import BackButton from "./BackButton";
import GeneratingOrder from "./GeneratingOrder";

const fetchHeaders = {
  Authorization: `Bearer ` + localStorage.getItem("token")
};

class GameView extends Component {
  constructor() {
    super();
    this.state = {
      matchID: "",
      players: "",
      team1: [],
      team2: [],
      originalWager: "",
      tallyWager: "",
      holeNum: "",
      gameProgress: "MatchForm"
    };
  }

  componentDidMount() {
    if (localStorage.getItem("matchID")) {
      fetch(
        `http://localhost:3000/api/v1/users/find_multiple_users_by_name/${localStorage.getItem(
          "players"
        )}`,
        { method: "GET", headers: fetchHeaders }
      )
        .then(resp => resp.json())
        .then(players =>
          this.setState({
            players,
            originalWager: localStorage.getItem("originalWager"),
            tallyWager: localStorage.getItem("tallyWager"),
            matchID: localStorage.getItem("matchID"),
            holeNum: parseInt(localStorage.getItem("holeNum")),
            gameProgress: "WolfSelection"
          })
        );
    }
  }
  onMatchSubmit = matchFormData => {
    let newPlayers = [
      matchFormData.player1,
      matchFormData.player2,
      matchFormData.player3,
      matchFormData.player4
    ];

    if (!newPlayers.includes(null)) {
      let playerString = "";
      newPlayers.forEach(player => {
        playerString += player + ",";
      });

      fetch(
        `http://localhost:3000/api/v1/users/find_multiple_users_by_name/${playerString}`,
        { method: "GET", headers: fetchHeaders }
      )
        .then(resp => resp.json())

        .then(players =>
          this.setState({
            players,
            originalWager: matchFormData.wager,
            tallyWager: matchFormData.wager,
            matchID: matchFormData.matchID,
            gameProgress: "Beginning"
          })
        )
        .catch(error => {
          alert(error);
          this.setState({ gameProgress: "MatchForm" });
        });
    } else {
      alert("You need 4 registered players to play this game");
    }
  };
  // establishPlayers = newPlayers => {
  //   let fetchedPlayers = [];
  //
  //       .then(fetchedPlayers => console.log(fetchedPlayers));
  //     // this.setState({
  //     //   players: fetchedPlayers,
  //     //   gameProgress: "Beginning"
  //     // })
  //     // );
  //   });
  // };

  moveToFirstWolf = () => {
    this.setState({
      holeNum: 1,
      gameProgress: "FirstWolfSelection"
    });
  };

  handleBeginRoundClick = () => {
    this.setState({
      gameProgress: "OrderGenerator"
    });
    setTimeout(() => this.moveToFirstWolf(), 3000);
  };

  onScoreSubmit = sortedScores => {
    if (this.state.holeNum === 18) {
      this.setState({ gameProgress: "MatchOver" });
    } else {
      let playersArray = this.state.players;
      let oldWolf = playersArray.shift();
      playersArray.push(oldWolf);

      this.setState({
        holeNum: this.state.holeNum + 1,
        players: playersArray,
        team1: "",
        team2: "",
        gameProgress: "WolfSelection"
      });

      if (
        (sortedScores[0].score === sortedScores[1].score &&
          sortedScores[0].team !== sortedScores[1].team) ||
        (sortedScores[0].score === sortedScores[2].score &&
          sortedScores[0].team !== sortedScores[2].team) ||
        (sortedScores[0].score === sortedScores[3].score &&
          sortedScores[0].team !== sortedScores[3].team)
      ) {
        this.setState({
          tallyWager:
            parseInt(this.state.tallyWager) + parseInt(this.state.originalWager)
        });
        localStorage.setItem(
          "tallyWager",
          parseInt(this.state.tallyWager) + parseInt(this.state.originalWager)
        );
      } else {
        this.setState({ tallyWager: this.state.originalWager });
        localStorage.setItem("tallyWager", this.state.originalWager);
      }

      setTimeout(this.setStorage(), 1000);
    }
  };

  setStorage = () => {
    let playerStorage = localStorage.setItem(
      "holeNum",
      (this.state.holeNum + 1).toString()
    );
    localStorage.setItem("matchID", this.state.matchID);
    localStorage.setItem(
      "players",
      this.state.players.map(player => player.username).join(",")
    );

    localStorage.setItem("originalWager", this.state.originalWager);
  };

  handleMatchSummaryButton = () => {
    this.setState({
      gameProgress: "MatchSummary"
    });
  };

  handleWolfButton = event => {
    event.preventDefault();
    switch (event.target.innerText) {
      case "Blind":
        this.setState({
          team1: [this.state.players[0]],
          team2: [
            this.state.players[1],
            this.state.players[2],
            this.state.players[3]
          ],
          tallyWager: this.state.tallyWager * 3,
          gameProgress: "MidRound"
        });
        break;
      case "Howl":
        this.setState({
          team1: [this.state.players[0]],
          team2: [
            this.state.players[1],
            this.state.players[2],
            this.state.players[3]
          ],
          tallyWager: this.state.tallyWager * 2,
          gameProgress: "MidRound"
        });
        break;
      case "Lone":
        this.setState({
          team1: [this.state.players[0]],
          team2: [
            this.state.players[1],
            this.state.players[2],
            this.state.players[3]
          ],
          gameProgress: "MidRound"
        });
    }
  };

  handleBack = () => {
    this.setState({
      gameProgress: "WolfSelection"
    });
  };

  handleWolfChoice = event => {
    event.preventDefault();

    if (this.state.gameProgress === "WolfSelection" || "FirstWolfSelection") {
      switch (event.target.innerText) {
        case this.state.players[1].username:
          this.setState({
            team1: [this.state.players[0], this.state.players[1]],
            team2: [this.state.players[2], this.state.players[3]],
            gameProgress: "MidRound"
          });
          break;
        case this.state.players[2].username:
          this.setState({
            team1: [this.state.players[0], this.state.players[2]],
            team2: [this.state.players[1], this.state.players[3]],
            gameProgress: "MidRound"
          });
          break;
        case this.state.players[3].username:
          this.setState({
            team1: [this.state.players[0], this.state.players[3]],
            team2: [this.state.players[1], this.state.players[2]],
            gameProgress: "MidRound"
          });
          break;
        default:
          console.log("Not Working");
      }
    }
  };

  renderController = () => {
    switch (this.state.gameProgress) {
      case "MatchForm":
        return (
          <div>
            <MatchForm
              onMatchSubmit={this.onMatchSubmit}
              signedInUser={this.props.signedInUser}
            />
          </div>
        );
        break;
      case "Beginning":
        return (
          <div className="Beginning">
            <h2>The Field is Set</h2>
            <PlayerCardContainer
              players={this.state.players}
              gameProgress={this.state.gameProgress}
              handleWolfChoice={this.handleWolfChoice}
            />
            <BeginRoundButton
              handleBeginRoundClick={this.handleBeginRoundClick}
            />
          </div>
        );
        break;
      case "OrderGenerator":
        return (
          <div className="OrderGenerator">
            <h2>Generating Random Wolf Order...</h2>
            <GeneratingOrder />;
          </div>
        );
        break;
      case "FirstWolfSelection":
        return (
          <div className="WolfSelection">
            <h3>Wolf Selection</h3>
            <h4>
              Hole: {this.state.holeNum} Wager: ${this.state.tallyWager}
            </h4>

            <PlayerCardContainer
              players={this.state.players}
              gameProgress={this.state.gameProgress}
              handleWolfChoice={this.handleWolfChoice}
            />
            <WolfButtons handleWolfButton={this.handleWolfButton} />
          </div>
        );
        break;
      case "WolfSelection":
        return (
          <div className="WolfSelection">
            <h3>Wolf Selection</h3>
            <h4>
              Hole: {this.state.holeNum} Wager: ${this.state.tallyWager}
            </h4>

            <PlayerCardContainer
              players={this.state.players}
              gameProgress={this.state.gameProgress}
              handleWolfChoice={this.handleWolfChoice}
            />
            <WolfButtons handleWolfButton={this.handleWolfButton} />
            <MatchSummaryButton
              handleMatchSummaryButton={this.handleMatchSummaryButton}
            />
          </div>
        );
        break;
      case "MidRound":
        let team1Display = "";
        let team2Display = "";
        if (this.state.team1.length === 2) {
          team1Display = `${this.state.team1[0].username} & ${
            this.state.team1[1].username
          }`;
        } else {
          team1Display = this.state.team1[0].username;
        }
        if (this.state.team2.length === 2) {
          team2Display = `${this.state.team2[0].username} & ${
            this.state.team2[1].username
          }`;
        } else {
          team2Display = `${this.state.team2[0].username}, ${
            this.state.team2[1].username
          } & ${this.state.team2[2].username}`;
        }

        return (
          <div className="MidRound">
            <div className="viewTitle">
              <p>
                Hole: {this.state.holeNum} Wager: ${this.state.tallyWager}
              </p>
              <p>
                {team1Display} vs {team2Display}
              </p>
            </div>

            <EnterScoreForm
              players={this.state.players}
              holeNum={this.state.holeNum}
              matchID={this.state.matchID}
              team1={this.state.team1}
              team2={this.state.team2}
              tallyWager={this.state.tallyWager}
              originalWager={this.state.originalWager}
              onScoreSubmit={this.onScoreSubmit}
            />
          </div>
        );
        break;
      // case "HoleScoreForm":
      // let team1Display = "";
      // let team2Display = "";
      // if (this.state.team1.length === 2) {
      //   team1Display = `${this.state.team1[0].username} & ${
      //     this.state.team1[1].username
      //   }`;
      // } else {
      //   team1Display = this.state.team1[0].username;
      // }
      // if (this.state.team2.length === 2) {
      //   team2Display = `${this.state.team2[0].username} & ${
      //     this.state.team2[1].username
      //   }`;
      // } else {
      //   team2Display = `${this.state.team2[0].username}, ${
      //     this.state.team2[1].username
      //   } & ${this.state.team2[2].username}`;
      // }

      // return (
      //   <div className="MidRound">
      //     <h3>Hole: {this.state.holeNum}</h3>
      //     <h4>
      //       {team1Display} <br /> vs <br /> {team2Display}
      //     </h4>
      //     <h4>Wager: ${this.state.tallyWager}</h4>
      //     <br />
      //     <EnterScoreForm
      //       players={this.state.players}
      //       holeNum={this.state.holeNum}
      //       matchID={this.state.matchID}
      //       team1={this.state.team1}
      //       team2={this.state.team2}
      //       tallyWager={this.state.tallyWager}
      //       originalWager={this.state.originalWager}
      //       onScoreSubmit={this.onScoreSubmit}
      //     />
      //   </div>
      // );
      // break;
      case "MatchSummary":
        return (
          <div className="MatchSummary">
            <MatchSummaryView
              holeNum={this.state.holeNum}
              players={this.state.players}
              match={this.state.matchID}
            />
            <BackButton handleBack={this.handleBack} />
          </div>
        );
        break;
      case "MatchOver":
        return (
          <div className="MatchSummary">
            <h3>Final Scores</h3>
            <MatchSummaryView
              players={this.state.players}
              match={this.state.matchID}
            />
            <BackButton handleBack={this.handleBack} />
          </div>
        );
    }
  };

  render() {
    return this.renderController();
  }
}

export default GameView;
