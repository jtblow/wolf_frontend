import React, { Component } from "react";
import "../App.css";
class CreateAccount extends Component {
  state = {
    username: "",
    email: "",
    email2: "",
    password: "",
    password2: "",
    loginSuccessful: false
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleCreateAccount = event => {
    event.preventDefault();
    const url = "http://localhost:3000/api/v1/users";
    const data = {
      user: {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password
      }
    };

    const fetchHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json"
    };

    if (
      this.state.email === this.state.email2 &&
      this.state.password === this.state.password2
    ) {
      fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: fetchHeaders
      })
        .then(resp => resp.json())
        .then(result => {
          console.log("result: ", result);
          this.props.getLoginData(result);
        });
      this.setState({ loginSuccessful: true });
    } else {
      alert("Please confirm email address and try again");
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
          placeholder="Email"
          name="email"
          type="text"
        />
        <br />
        <input
          className="FormInput"
          onChange={this.handleChange}
          placeholder="Confirm Email"
          name="email2"
          type="text"
        />
        <input
          className="FormInput"
          onChange={this.handleChange}
          placeholder="Password"
          name="password"
          type="text"
        />
        <br />
        <input
          className="FormInput"
          onChange={this.handleChange}
          placeholder="Confirm Password"
          name="password2"
          type="text"
        />
        <br />
        <button onClick={event => this.handleCreateAccount(event)}>
          Create Account
        </button>
      </form>
    );
  }
}

export default CreateAccount;
