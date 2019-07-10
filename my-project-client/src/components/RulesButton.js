import React from "react";

const RulesButton = props => {
  return (
    <div className="rulesbutton" onClick={event => props.handleHome(event)}>
      Home
    </div>
  );
};
export default RulesButton;
