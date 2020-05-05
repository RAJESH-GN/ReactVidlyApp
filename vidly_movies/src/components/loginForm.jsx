import React, { Component } from "react";
import Input from "../common/input";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
    errors: {},
  };
  //username = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault(); //to stop reloading of the whole page after submitting form
    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;
    console.log("Submitted");
  };

  validate = () => {
    const { account } = this.state;
    let errors = {};
    if (account.username.trim() == "") {
      errors["username"] = "Username is required";
    }
    if (account.password.trim() == "") {
      errors["password"] = "Password is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <Input
          name="username"
          label="Username"
          onChange={this.handleChange}
          value={this.state.account.username}
          inputType="text"
          errorMsg={this.state.errors.username}
        />
        <Input
          name="password"
          label="Password"
          onChange={this.handleChange}
          value={this.state.account.password}
          inputType="password"
          errorMsg={this.state.errors.password}
        />
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
