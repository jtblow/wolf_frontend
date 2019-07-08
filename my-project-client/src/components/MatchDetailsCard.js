import React from "react";

const MatchDetailsCard = props => {
  return (
    // <tbody>
    //   <th>{props.holeNum}</th>
    //   <tr>
    //     <th>{props.player.username}</th>
    //     <td>{props.score}</td>
    //     <td>${props.outcome}</td>
    //   </tr>
    // </tbody>

    <tr>
      <td>{props.score}</td>
      <td>`$${props.outcome}`</td>
    </tr>
  );
};
export default MatchDetailsCard;
