import React, { Component } from "react";
import GameView from "./GameView";
import Login from "./Login";
import UserMatchList from "./UserMatchList";
import CreateAccount from "./CreateAccount";
import HomeButton from "./HomeButton";
import Header from "./Header";
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

  handleCreateAccountClick = event => {
    event.preventDefault();
    this.setState({ currentView: "CreateAccount" });
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
    } else if (event.target.innerText === "Start a New Match") {
      localStorage.removeItem("matchID");
      this.setState({ currentView: "GameView" });
    } else {
      this.setState({ currentView: "GameView" });
    }
  };

  handleHome = event => {
    event.preventDefault();
    this.setState({ currentView: "HomeView" });
  };

  homeRenderController = () => {
    switch (this.state.currentView) {
      case "login":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
            />
            <Login className="Login" getLoginData={this.getLoginData} />;
            <br />
            <button
              className="CreateAccountButton"
              onClick={this.handleCreateAccountClick}
            >
              Create Account
            </button>
          </div>
        );
        break;
      case "CreateAccount":
        return (
          <div>
            <Header currentView={this.state.currentView} />
            <CreateAccount getLoginData={this.getLoginData} />
          </div>
        );
        break;

      case "HomeView":
        if (localStorage.getItem("matchID")) {
          return (
            <div className="HomeView">
              <Header
                currentView={this.state.currentView}
                handleHome={this.handleHome}
              />
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
                Continue Current Match
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
        } else {
          return (
            <div className="HomeView">
              <Header
                currentView={this.state.currentView}
                handleHome={this.handleHome}
              />
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
        }
        break;
      case "UserMatchList":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
            />

            <UserMatchList signedInUser={this.state.signedInUser} />
          </div>
        );
        break;
      case "GameView":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
            />

            <GameView signedInUser={this.state.signedInUser} />
          </div>
        );
    }
  };

  render() {
    return <div>{this.homeRenderController()}</div>;
  }
}

export default Home;
