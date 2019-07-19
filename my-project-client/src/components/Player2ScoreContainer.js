import React, { Component } from "react";
import Player2ScoreButtons from "./Player2ScoreButtons";

import "../App.css";

const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";

class Player2ScoreContainer extends Component {
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

  renderPlayer2ScoreButtons = () => {
    let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let P2Buttons = numArray.map(num => {
      return (
        <Player2ScoreButtons
          key={num}
          ref={"Player2Num" + num}
          num={num}
          selectedNumber={this.props.Player2}
          handleP2TextChange={this.props.handleP2TextChange}
          handleScoreChoice={this.handleScoreChoice}
        />
      );
    });
    return P2Buttons;
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
            {this.props.players[1].username} - {this.props.selectedNumber}
          </div>
        </div>
      );
    } else if (this.props.selectedPlayer == this.props.players[1].username) {
      return (
        <div>
          <div
            className="BackgroundText"
            onClick={event => this.props.handlePlayerClick(event)}
          >
            {this.props.players[1].username}
          </div>

          <div className="Player2ScoreContainer">
            {this.renderPlayer2ScoreButtons()}
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
            {this.props.players[1].username}
          </div>
          <div className="Player2ScoreContainer" />
        </div>
      );
    }
  };
  render() {
    return this.renderController();
  }
}
export default Player2ScoreContainer;
