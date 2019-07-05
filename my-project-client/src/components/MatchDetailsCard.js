import React from "react";

const MatchDetailsCard = props => {
  return (
    <tr>
      <td>{props.score}</td>
      <td>${props.outcome}</td>
    </tr>
  );
};
export default MatchDetailsCard;
