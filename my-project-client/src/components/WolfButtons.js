import React from "react";

const WolfButtons = props => {
  return (
    <div>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        {" "}
        Blind{" "}
      </button>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        {" "}
        Howl{" "}
      </button>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        {" "}
        Lone{" "}
      </button>
    </div>
  );
};
export default WolfButtons;
