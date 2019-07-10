import React, { Component } from "react";
import MatchSummaryCard from "./MatchSummaryCard";
import MatchDetailsContainer from "./MatchDetailsContainer";
import MatchDetailsButton from "./MatchDetailsButton";
import BackButton from "./BackButton";
import "../App.css";

class MatchSummaryView extends Component {
  constructor() {
    super();
    this.state = {
      matchSummaryCards: "",
      detailsView: false,
      players: ""
    };
  }

  showCard = holes => {
    let matchPlayers = [...new Set(holes.map(hole => hole.user_id))];
    let matchPlayersIDs = matchPlayers.join(",");
    fetch(
      "http://localhost:3000/api/v1/users/find_multiple_users_by_id/" +
        matchPlayersIDs
    )
      .then(resp => resp.json())
      .then(players => {
        this.setState({
          players: players,
          matchSummaryCards: players.map(player =>
            this.getSummaryCard(player, holes)
          )
        });
      });
  };

  handleMatchDetailsButton = event => {
    event.preventDefault();
    this.setState({
      detailsView: !this.state.detailsView
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
  matchSumView = () => {
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
        <MatchDetailsButton
          handleMatchDetailsButton={this.handleMatchDetailsButton}
        />
      </div>
    );
  };
  render() {
    return this.state.detailsView ? (
      <div>
        <MatchDetailsContainer
          players={this.state.players}
          match={this.props.match}
          holeNum={this.props.holeNum}
        />
        <BackButton handleBack={this.handleBack} />
      </div>
    ) : (
      this.matchSumView()
    );
  }
}
export default MatchSummaryView;
