import React from "react";

const BackButton = props => {
  return (
    <button className="butn" onClick={props.handleBack}>
      {" "}
      Back{" "}
    </button>
  );
};
export default BackButton;
