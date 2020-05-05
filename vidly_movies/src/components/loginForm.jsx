import React, { Component } from "react";

class LoginForm extends Component {
  state = {
    account: { username: "", password: "" },
  };
  //username = React.createRef();
  handleSubmit = (e) => {
    e.preventDefault(); //to stop reloading of the whole page after submitting form
    console.log(this.username.current.focus());
  };

  handleChange = (e) => {
    const account = { ...this.state.account };
    account[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ account });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={this.state.account.username}
            onChange={this.handleChange}
            ref={this.username}
            type="text"
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            name="password"
            id="password"
            onChange={this.handleChange}
            type="password"
            className="form-control"
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
      </form>
    );
  }
}

export default LoginForm;
