import React, { Component } from "react";
import "../App.css";
const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";
class Player4ScoreButtons extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.selectedNumber == this.props.num) {
      return (
        <button
          className="ScoreButtons"
          onClick={event => {
            this.props.handleP4TextChange(event);
            this.props.handleScoreChoice(event);
          }}
          value={this.props.num}
          style={{ backgroundImage: `url(${imgURL})` }}
        >
          {this.props.num}
        </button>
      );
    } else {
      return (
        <button
          className="ScoreButtons"
          onClick={event => this.props.handleP4TextChange(event)}
          value={this.props.num}
          onClick={event => {
            this.props.handleP4TextChange(event);
            this.props.handleScoreChoice(event);
          }}
        >
          {this.props.num}
        </button>
      );
    }
  }
}
export default Player4ScoreButtons;
