import React, { Component } from "react";
import MatchDetailsCard from "./MatchDetailsCard";

class MatchDetailsContainer extends Component {
  constructor() {
    super();
    this.state = {
      matchDetailsCards: ""
    };
  }

  showCard = holes => {
    this.setState({
      matchDetailsCards: this.props.players.map(player =>
        this.getDetailsCard(player, holes)
      )
    });
  };

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/matches/holes/${this.props.match}`)
      .then(resp => resp.json())
      .then(holes => this.showCard(holes));
  }

  getDetailsCard = (player, holes) => {
    let filteredHoles = holes.filter(hole => hole.user_id === player.id);

    let filteredHoleCards = filteredHoles.map(hole => {
      return (
        <React.Fragment>
          <td>{hole.score}</td>
          <td>{hole.outcome}</td>
        </React.Fragment>
      );
    });

    return filteredHoleCards;
  };

  render() {
    return (
      <div>
        <h2>Match Details</h2>

        <table>
          <thead>
            <tr>
              <th />

              <th colSpan="2">1</th>

              <th colSpan="2">2</th>
              <th colSpan="2">3</th>
              <th colSpan="2">4</th>
              <th colSpan="2">5</th>
              <th colSpan="2">6</th>
              <th colSpan="2">7</th>
              <th colSpan="2">8</th>
              <th colSpan="2">9</th>
              <th colSpan="2">10</th>
              <th colSpan="2">11</th>
              <th colSpan="2">12</th>
              <th colSpan="2">13</th>
              <th colSpan="2">14</th>
              <th colSpan="2">15</th>
              <th colSpan="2">16</th>
              <th colSpan="2">17</th>
              <th colSpan="2">18</th>
            </tr>
            <tr>
              <th />
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
              <th>Score</th>
              <th>$</th>
            </tr>
          </thead>
          <tr>
            <th scope="row">{this.props.players[0].username}</th>
            {this.state.matchDetailsCards[0]}
          </tr>
          <tr>
            <th scope="row">{this.props.players[1].username}</th>
            {this.state.matchDetailsCards[1]}
          </tr>
          <tr>
            <th scope="row">{this.props.players[2].username}</th>
            {this.state.matchDetailsCards[2]}
          </tr>
          <tr>
            <th scope="row">{this.props.players[3].username}</th>
            {this.state.matchDetailsCards[3]}
          </tr>
        </table>
      </div>
    );
  }
}
export default MatchDetailsContainer;
