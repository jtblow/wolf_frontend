import React, { Component } from "react";
import GameView from "./GameView";
import Login from "./Login";

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
      loginSuccessful: true
    });
    localStorage.setItem(user, response.id);
  };
  homeRenderController = () => {
    if (this.state.loginSuccessful === true) {
      return <GameView signedInUser={this.state.signedInUser} />;
    } else {
      return <Login getLoginData={this.getLoginData} />;
    }
  };

  render() {
    return <div>{this.homeRenderController()}</div>;
  }
}

export default Home;
