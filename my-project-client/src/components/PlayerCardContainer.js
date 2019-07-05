import React, { Component } from "react";
import PlayerCard from "./PlayerCard";

class PlayerCardContainer extends Component {
  constructor() {
    super();
    this.state = {
      players: []
    };
  }

  // handleWolfTest = () => {
  //   this.props.handleWolfClick();
  // };

  renderRandomOrder = () => {
    let randomOrder = this.props.players.sort((a, b) => 0.5 - Math.random());
    let randomPlayerCards = randomOrder.map(player => {
      if (player === this.props.players[0]) {
        return (
          <div className="wolfCard">
            <PlayerCard
              player={player}
              handleWolfChoice={this.props.handleWolfChoice}
            />
          </div>
        );
      } else {
        return (
          <div className="normalPlayerCard">
            <PlayerCard
              player={player}
              handleWolfChoice={this.props.handleWolfChoice}
            />
          </div>
        );
      }
    });
    return randomPlayerCards;
  };
  renderInitialOrder = () => {
    let initialPlayerCards = this.props.players.map(player => {
      return (
        <div className="normalPlayerCard">
          <PlayerCard
            handleWolfChoice={this.props.handleWolfChoice}
            player={player}
          />
        </div>
      );
    });
    return initialPlayerCards;
  };

  renderNormalOrder = () => {
    let normalPlayerCards = this.props.players.map(player => {
      if (player === this.props.players[0]) {
        return (
          <div className="wolfCard">
            <PlayerCard
              player={player}
              handleWolfChoice={this.props.handleWolfChoice}
            />
          </div>
        );
      } else {
        return (
          <div className="normalPlayerCard">
            <PlayerCard
              player={player}
              handleWolfChoice={this.props.handleWolfChoice}
            />
          </div>
        );
      }
    });
    return normalPlayerCards;
  };
  render() {
    return (
      <div>
        {this.props.gameProgress === "FirstWolfSelection"
          ? this.renderRandomOrder()
          : this.props.gameProgress === "Beginning"
          ? this.renderInitialOrder()
          : this.renderNormalOrder()}
      </div>
    );
  }
}
export default PlayerCardContainer;
