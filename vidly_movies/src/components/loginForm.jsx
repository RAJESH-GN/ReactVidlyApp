import React, { Component } from "react";
import Form from "./form";
import Joi from "@hapi/joi";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  });
  //username = React.createRef();
  toDoAfterValidation = () => {
    console.log("Submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        <button
          className="btn btn-primary"
          type="submit"
          disabled={this.validate()}
        >
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
