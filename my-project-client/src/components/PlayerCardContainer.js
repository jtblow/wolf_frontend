import React, { Component } from "react";
import PlayerCard from "./PlayerCard";

class PlayerCardContainer extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  renderRandomOrder = () => {
    let randomOrder = this.props.players.sort((a, b) => 0.5 - Math.random());
    let randomPlayerCards = randomOrder.map(player => {
      return (
        <div>
          <PlayerCard
            className="PlayerCard"
            player={player}
            handleWolfChoice={this.props.handleWolfChoice}
          />
          <br />
        </div>
      );
    });
    return randomPlayerCards;
  };

  renderNormalOrder = () => {
    let normalPlayerCards = this.props.players.map(player => {
      return (
        <div className="PlayerCardContainer">
          <PlayerCard
            player={player}
            handleWolfChoice={this.props.handleWolfChoice}
          />
          <br />
        </div>
      );
    });
    return normalPlayerCards;
  };
  render() {
    return (
      <div>
        {this.props.gameProgress === "FirstWolfSelection"
          ? this.renderRandomOrder()
          : this.renderNormalOrder()}
      </div>
    );
  }
}
export default PlayerCardContainer;
