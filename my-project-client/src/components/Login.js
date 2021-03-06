import React, { Component } from "react";
import "../App.css";
class Login extends Component {
  state = {
    username: "",
    password: "",
    loginSuccessful: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCreateAccount = event => {
    event.preventDefault();
    const url = "http://localhost:3000/api/v1/login";
    const data = {
      user: {
        username: this.state.username,
        password: this.state.password
      }
    };

    const fetchHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    fetch(url, {
      method: "POST",

      body: JSON.stringify(data),
      headers: fetchHeaders
    })
      .then(resp => resp.json())
      .then(result => {
        console.log("result: ", result);
        this.checkLoginResult(result);
        if (this.state.loginSuccessful === true) {
          this.props.getLoginData(result);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  checkLoginResult = result => {
    if (!!result.errors === true) {
      alert("Login failed, please try another username and email");
    } else {
      this.setState({
        loginSuccessful: true
      });
    }
  };

  render() {
    return (
      <form className="Login">
        <input
          className="FormInput"
          onChange={this.handleChange}
          placeholder="Username"
          name="username"
        />
        <br />
        <input
          className="FormInput"
          onChange={this.handleChange}
          placeholder="Password"
          name="password"
          type="text"
        />
        <br />
        <button
          className="loginButton"
          onClick={event => this.handleCreateAccount(event)}
        >
          Login
        </button>
      </form>
    );
  }
}

export default Login;
