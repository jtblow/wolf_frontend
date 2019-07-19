import React, { Component } from "react";
import PlayerScoreButtons from "./PlayerScoreButtons";

import "../App.css";

const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";

class Player1ScoreContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entered: false
    };
  }

  // handleSelect = () => {
  //   this.setState({ selected: !this.state.selected });
  // };
  handleScoreChoice = event => {
    event.preventDefault();
    this.setState({ entered: !this.state.entered });
  };

  handleReentry = event => {
    event.preventDefault();
    this.setState({ entered: !this.state.entered });
  };

  renderPlayer1ScoreButtons = () => {
    let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let P1Buttons = numArray.map(num => {
      return (
        <PlayerScoreButtons
          key={num}
          ref={"Player1Num" + num}
          num={num}
          selectedNumber={this.props.Player1}
          handleP1TextChange={this.props.handleP1TextChange}
          handleScoreChoice={this.handleScoreChoice}
        />
      );
    });
    return P1Buttons;
  };

  renderController = () => {
    if (this.state.entered) {
      return (
        <div>
          <div
            className="EnteredBackgroundText"
            onClick={event => {
              this.props.handlePlayerClick(event);
              this.handleReentry(event);
            }}
          >
            {this.props.players[0].username} - {this.props.selectedNumber}
          </div>
        </div>
      );
    } else if (this.props.selectedPlayer == this.props.players[0].username) {
      return (
        <div>
          <div
            className="BackgroundText"
            onClick={event => this.props.handlePlayerClick(event)}
          >
            {this.props.players[0].username}
          </div>

          <div className="Player1ScoreContainer">
            {this.renderPlayer1ScoreButtons()}
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            className="BackgroundText"
            onClick={event => this.props.handlePlayerClick(event)}
          >
            {this.props.players[0].username}
          </div>
          <div className="Player1ScoreContainer" />
        </div>
      );
    }
  };
  render() {
    return this.renderController();
  }
}
export default Player1ScoreContainer;
