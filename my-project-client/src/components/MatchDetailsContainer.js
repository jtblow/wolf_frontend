import React, { Component } from "react";
import MatchSummaryCard from "./MatchSummaryCard";

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
        this.getSummaryCard(player, holes)
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

    return (
      <MatchSummaryCard
        player={player}
        score={filteredHoles.score}
        outcome={filteredHoles.outcome}
      />
    );
  };

  render() {
    return (
      <div>
        <h2>Match Details</h2>

        <table>
          <tbody>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Bank</th>
            </tr>
            {this.state.matchDetailsCards}
          </tbody>
        </table>
      </div>
    );
  }
}
export default MatchSummaryView;
