import React from "react";

const WolfButtons = props => {
  return (
    <div>
      <button onClick={props.handleWolfButton}> Blind Wolf </button>
      <button onClick={props.handleWolfButton}> Strong Wolf </button>
      <button onClick={props.handleWolfButton}> Lone Wolf </button>
    </div>
  );
};
export default WolfButtons;
