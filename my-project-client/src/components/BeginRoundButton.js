import React from "react";

const BeginRoundButton = props => {
  return (
    <button className="arrow" onClick={props.handleBeginRoundClick}>
      {" "}
      Begin Round{" "}
    </button>
  );
};
export default BeginRoundButton;
