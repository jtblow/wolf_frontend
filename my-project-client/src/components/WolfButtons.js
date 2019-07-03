import React from "react";

const WolfButtons = props => {
  return (
    <div>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        Blind Wolf
      </button>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        {" "}
        Strong Wolf{" "}
      </button>
      <button className="WolfButtons" onClick={props.handleWolfButton}>
        {" "}
        Lone Wolf{" "}
      </button>
    </div>
  );
};
export default WolfButtons;
