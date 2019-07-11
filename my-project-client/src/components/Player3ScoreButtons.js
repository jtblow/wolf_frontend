import React, { Component } from "react";
import "../App.css";
const imgURL = "https://i.ibb.co/nkTGQmj/greenball.png";
class Player3ScoreButtons extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    if (this.props.selectedNumber == this.props.num) {
      return (
        <button
          className="p3ScoreButtons"
          onClick={event => this.props.handleP3TextChange(event)}
          value={this.props.num}
          style={{ backgroundImage: `url(${imgURL})` }}
        >
          {this.props.num}
        </button>
      );
    } else {
      return (
        <button
          className="p3ScoreButtons"
          onClick={event => this.props.handleP3TextChange(event)}
          value={this.props.num}
        >
          {this.props.num}
        </button>
      );
    }
  }
}
export default Player3ScoreButtons;
