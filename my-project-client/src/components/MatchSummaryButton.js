import React from "react";

const MatchSummaryButton = props => {
  return (
    <div
      className="ViewMatchSummaryButton"
      onClick={props.handleMatchSummaryButton}
    >
      {" "}
      View Match Summary{" "}
    </div>
  );
};
export default MatchSummaryButton;
