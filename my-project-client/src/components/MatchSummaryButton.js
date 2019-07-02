import React from "react";

const MatchSummaryButton = props => {
  return (
    <button onClick={props.handleMatchSummaryButton}>
      {" "}
      View Match Summary{" "}
    </button>
  );
};
export default MatchSummaryButton;
