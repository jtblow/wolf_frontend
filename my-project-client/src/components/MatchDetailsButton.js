import React from "react";

const MatchDetailsButton = props => {
  return (
    <div
      className="ViewMatchSummaryButton"
      onClick={props.handleMatchDetailsButton}
    >
      {" "}
      View Match Details{" "}
    </div>
  );
};
export default MatchDetailsButton;
