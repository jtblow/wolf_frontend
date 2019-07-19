import React, { Component } from "react";
import Player3ScoreButtons from "./Player3ScoreButtons";

import "../App.css";

const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";

class Player3ScoreContainer extends Component {
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

  renderPlayer3ScoreButtons = () => {
    let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let P3Buttons = numArray.map(num => {
      return (
        <Player3ScoreButtons
          key={num}
          ref={"Player3Num" + num}
          num={num}
          selectedNumber={this.props.Player3}
          handleP3TextChange={this.props.handleP3TextChange}
          handleScoreChoice={this.handleScoreChoice}
        />
      );
    });
    return P3Buttons;
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
            {this.props.players[2].username} - {this.props.selectedNumber}
          </div>
        </div>
      );
    } else if (this.props.selectedPlayer == this.props.players[2].username) {
      return (
        <div>
          <div
            className="BackgroundText"
            onClick={event => this.props.handlePlayerClick(event)}
          >
            {this.props.players[2].username}
          </div>

          <div className="Player3ScoreContainer">
            {this.renderPlayer3ScoreButtons()}
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
            {this.props.players[2].username}
          </div>
          <div className="Player3ScoreContainer" />
        </div>
      );
    }
  };
  render() {
    return this.renderController();
  }
}
export default Player3ScoreContainer;
