import React from "react";
import HomeButton from "./HomeButton";
import RulesButton from "./RulesButton";
const Header = props => {
  if (
    props.currentView === "UserMatchList" ||
    props.currentView === "GameView"
  ) {
    return (
      <header className="App-header">
        <HomeButton handleHome={props.handleHome} />
        <RulesButton />
        <div className="imgcontainer">
          <img
            src="https://i.ibb.co/SvwdGLJ/WolfLogo.png"
            alt="WolfLogo"
            border="0"
            className="WolfLogo"
          />
        </div>
      </header>
    );
  } else {
    return (
      <header className="App-header">
        <div className="imgcontainer">
          <img
            src="https://i.ibb.co/SvwdGLJ/WolfLogo.png"
            alt="WolfLogo"
            border="0"
            className="WolfLogo"
          />
        </div>
      </header>
    );
  }
};
export default Header;
