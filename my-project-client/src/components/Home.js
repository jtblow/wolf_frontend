import React, { Component } from "react";
import GameView from "./GameView";
import Login from "./Login";
import UserMatchList from "./UserMatchList";
import CreateAccount from "./CreateAccount";
import HomeButton from "./HomeButton";
import Header from "./Header";
import Rules from "./Rules";
import "../App.css";
const fetchHeaders = {
  Authorization: `Bearer ` + localStorage.getItem("token")
};

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
    if (localStorage.getItem("token")) {
      const url = "http://localhost:3000/api/v1/profile";

      fetch(url, {
        method: "GET",
        headers: fetchHeaders
      })
        .then(resp => resp.json())
        .then(response => this.stayLoggedIn(response));
    }
  }
  stayLoggedIn = response => {
    console.log(response);
    this.setState({
      signedInUser: {
        userID: response.user.id,
        username: response.user.username,
        email: response.user.email
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
        userID: response.user.id,
        username: response.user.username,
        email: response.user.email
      },
      currentView: "HomeView"
    });
    localStorage.setItem("user", this.state.signedInUser.username);
    localStorage.setItem("mail", this.state.signedInUser.email);
    localStorage.setItem("token", response.jwt);
  };

  handleClick = event => {
    if (event.target.innerText === "View Past Matches") {
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
  handleRules = event => {
    event.preventDefault();
    this.setState({ currentView: "Rules" });
  };

  homeRenderController = () => {
    switch (this.state.currentView) {
      case "login":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
              handleRules={this.handleRules}
            />
            <button
              className="CreateAccountButton"
              onClick={this.handleCreateAccountClick}
            >
              Create Account
            </button>
            <Login className="Login" getLoginData={this.getLoginData} />
            <br />
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
                handleRules={this.handleRules}
              />
              <div
                className="HomeButtons"
                onClick={event => this.handleClick(event)}
              >
                View Past Matches
              </div>
              <br />
              <div
                className="HomeButtons"
                onClick={event => this.handleClick(event)}
              >
                Continue Match
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
                handleRules={this.handleRules}
              />
              <div
                className="HomeButtons"
                onClick={event => this.handleClick(event)}
              >
                View Past Matches
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
              handleRules={this.handleRules}
            />

            <UserMatchList signedInUser={this.state.signedInUser} />
          </div>
        );
        break;

      case "Rules":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
              handleRules={this.handleRules}
            />

            <Rules className="Rules" />
          </div>
        );
        break;
      case "GameView":
        return (
          <div>
            <Header
              currentView={this.state.currentView}
              handleHome={this.handleHome}
              handleRules={this.handleRules}
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
