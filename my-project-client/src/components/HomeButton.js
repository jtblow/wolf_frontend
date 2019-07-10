import React from "react";

const HomeButton = props => {
  return (
    <div className="homebutton" onClick={event => props.handleHome(event)}>
      Home
    </div>
  );
};
export default HomeButton;
