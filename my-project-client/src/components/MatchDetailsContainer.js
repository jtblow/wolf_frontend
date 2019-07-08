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
        <MatchDetailsCard
          player={player}
          score={hole.score}
          outcome={hole.outcome}
          holeNum={hole.hole_number}
        />
      );
    });

    return filteredHoleCards;
  };

  render() {
    return (
      <div>
        <h2>Match Details</h2>

        <table>
          <tbody>
            <tr>
              <th />
              <th scope="col">header1</th>
              <th scope="col">header2</th>
              <th scope="col">header3</th>
            </tr>
            {this.state.matchDetailsCards.slice(0, 4)}
            <tr>
              <th scope="row">header 2</th>
              {this.state.matchDetailsCards.slice(4, 8)}
            </tr>
            <tr>
              <th scope="row">header 3</th>
              <td>3</td>
              <td>3</td>
              <td>3</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default MatchDetailsContainer;
