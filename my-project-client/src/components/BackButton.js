import React from "react";

const BackButton = props => {
  return (
    <button className="backbutton" onClick={props.handleBack}>
      {" "}
      Back{" "}
    </button>
  );
};
export default BackButton;
