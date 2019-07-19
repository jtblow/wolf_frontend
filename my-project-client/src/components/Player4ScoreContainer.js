import React, { Component } from "react";
import Player4ScoreButtons from "./Player4ScoreButtons";

import "../App.css";

const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";

class Player4ScoreContainer extends Component {
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

  renderPlayer4ScoreButtons = () => {
    let numArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    let P4Buttons = numArray.map(num => {
      return (
        <Player4ScoreButtons
          key={num}
          ref={"Player4Num" + num}
          num={num}
          selectedNumber={this.props.Player4}
          handleP4TextChange={this.props.handleP4TextChange}
          handleScoreChoice={this.handleScoreChoice}
        />
      );
    });
    return P4Buttons;
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
            {this.props.players[3].username} - {this.props.selectedNumber}
          </div>
        </div>
      );
    } else if (this.props.selectedPlayer == this.props.players[3].username) {
      return (
        <div>
          <div
            className="BackgroundText"
            onClick={event => this.props.handlePlayerClick(event)}
          >
            {this.props.players[3].username}
          </div>

          <div className="Player4ScoreContainer">
            {this.renderPlayer4ScoreButtons()}
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
            {this.props.players[3].username}
          </div>
          <div className="Player4ScoreContainer" />
        </div>
      );
    }
  };
  render() {
    return this.renderController();
  }
}
export default Player4ScoreContainer;
