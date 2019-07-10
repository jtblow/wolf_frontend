import React from "react";

const RulesButton = props => {
  return (
    <div className="rulesbutton" onClick={event => props.handleHome(event)}>
      Rules
    </div>
  );
};
export default RulesButton;
