import React from "react";
import "../App.css";

const PlayerCard = props => {
  return (
    <div onClick={event => props.handleWolfChoice(event)}>
      {props.player.username}
    </div>
  );
};
export default PlayerCard;
