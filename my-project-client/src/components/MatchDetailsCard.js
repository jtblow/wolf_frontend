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
    <tbody>
      <tr>
        <th scope="row">{props.player.username}</th>
        <td>{props.score}</td>
        <td>{props.outcome}</td>
      </tr>
    </tbody>
  );
};
export default MatchDetailsCard;
