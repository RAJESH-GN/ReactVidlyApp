import React, { Component } from "react";

class MovieDetails extends Component {
  state = {};
  handleSave = () => {
    this.props.history.replace("/movies");
  };
  render() {
    return (
      <React.Fragment>
        <h1>Movie Id: {this.props.match.params.id}</h1>
        <button onClick={this.handleSave}>save</button>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
