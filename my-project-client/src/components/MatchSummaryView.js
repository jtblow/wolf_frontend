import React, { Component } from "react";
import MatchSummaryCard from "./MatchSummaryCard";

class MatchSummaryView extends Component {
  constructor() {
    super();
    this.state = {
      matchSummaryCards: ""
    };
  }

  showCard = holes => {
    this.setState({
      matchSummaryCards: this.props.players.map(player =>
        this.getSummaryCard(player, holes)
      )
    });
  };

  componentDidMount() {
    fetch(`http://localhost:3000/api/v1/matches/holes/${this.props.match}`)
      .then(resp => resp.json())
      .then(holes => this.showCard(holes));
  }

  getSummaryCard = (player, holes) => {
    let filteredHoles = holes.filter(hole => hole.user_id === player.id);
    let holeVal = filteredHoles.reduce(function(previousValue, currentValue) {
      return {
        score: previousValue.score + currentValue.score,
        outcome: previousValue.outcome + currentValue.outcome
      };
    });
    return (
      <MatchSummaryCard
        player={player}
        score={holeVal.score}
        outcome={holeVal.outcome}
      />
    );
  };

  render() {
    return (
      <div>
        <h2>Match Summary</h2>

        <table>
          <tbody>
            <tr>
              <th>Player</th>
              <th>Score</th>
              <th>Bank</th>
            </tr>
            {this.state.matchSummaryCards}
          </tbody>
        </table>
      </div>
    );
  }
}
export default MatchSummaryView;
