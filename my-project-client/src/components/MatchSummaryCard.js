import React from "react";

const MatchSummaryCard = props => {
  return (
    <tr>
      <td>{props.player.username}</td>
      <td>{props.score}</td>
      <td>${props.outcome}</td>
    </tr>
  );
};
export default MatchSummaryCard;
