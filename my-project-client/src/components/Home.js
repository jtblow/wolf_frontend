import React, { Component } from "react";
import GameView from "./GameView";
import Login from "./Login";
import UserMatchList from "./UserMatchList";
import "../App.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      loginSuccessful: false,
      currentView: "login",
      signedInUser: ""
    };
  }
  componentDidMount() {
    if (localStorage.getItem("user")) {
      const url = "http://localhost:3000/api/v1/users/login";
      const data = {
        user: {
          username: localStorage.getItem("user"),
          email: localStorage.getItem("mail")
        }
      };
      const fetchHeaders = {
        "Content-Type": "application/json"
      };

      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: fetchHeaders
      })
        .then(resp => resp.json())
        .then(response => this.stayLoggedIn(response));
    }
  }
  stayLoggedIn = response => {
    this.setState({
      signedInUser: {
        userID: response.id,
        username: response.username,
        email: response.email
      },
      currentView: "HomeView"
    });
  };

  getLoginData = response => {
    this.setState({
      signedInUser: {
        userID: response.id,
        username: response.username,
        email: response.email
      },
      currentView: "HomeView"
    });
    localStorage.setItem("user", this.state.signedInUser.username);
    localStorage.setItem("mail", this.state.signedInUser.email);
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
        return <Login className="Login" getLoginData={this.getLoginData} />;
        break;
      case "HomeView":
        return (
          <div className="HomeView">
            <div
              className="HomeButtons"
              onClick={event => this.handleClick(event)}
            >
              View Your Wolf Matches
            </div>
            <br />
            <div
              className="HomeButtons"
              onClick={event => this.handleClick(event)}
            >
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
