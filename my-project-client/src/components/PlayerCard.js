import React from "react";
import "../App.css";

const PlayerCard = props => {
  return (
    <div
      className="PlayerCard"
      onClick={event => props.handleWolfChoice(event)}
    >
      {props.player.username}
    </div>
  );
};
export default PlayerCard;
