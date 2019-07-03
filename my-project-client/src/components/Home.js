import React, { Component } from "react";
import GameView from "./GameView";
import Login from "./Login";
import UserMatchList from "./UserMatchList";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loginSuccessful: false,
      currentView: "login",
      signedInUser: ""
    };
  }
  getLoginData = response => {
    this.setState({
      signedInUser: {
        userID: response.id,
        username: response.username,
        email: response.email
      },
      currentView: "HomeView"
    });
  };

  handleClick = event => {
    if (event.target.innerText === "View Your Wolf Matches") {
      this.setState({ currentView: "UserMatchList" });
    } else {
      this.setState({ currentView: "GameView" });
    }
  };

  homeRenderController = () => {
    switch (this.state.currentView) {
      case "login":
        return <Login getLoginData={this.getLoginData} />;
        break;
      case "HomeView":
        return (
          <div>
            <div onClick={event => this.handleClick(event)}>
              View Your Wolf Matches
            </div>
            <div onClick={event => this.handleClick(event)}>
              Start a New Match
            </div>
          </div>
        );
        break;
      case "UserMatchList":
        return <UserMatchList signedInUser={this.state.signedInUser} />;
        break;
      case "GameView":
        return <GameView signedInUser={this.state.signedInUser} />;
    }
  };

  render() {
    return <div>{this.homeRenderController()}</div>;
  }
}

export default Home;
