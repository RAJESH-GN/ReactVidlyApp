import React, { Component } from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { getGenres } from "./../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";

class RegisterMovie extends Form {
  state = {
    data: { title: "", numberInStock: "", dailyRentalRate: "", genreId: "" },
    errors: {},
    genres: getGenres(),
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log("RegisterMovie -> componentDidMount -> id", id);
    if (id !== "new") {
      const movie = getMovie(id);
      this.setState({ data: this.mapToView(movie) });
    } else this.props.history.push("/movies/new");
  }

  mapToView = (movie) => {
    return {
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  schema = Joi.object({
    _id: Joi.string(),
    title: Joi.string().required(),
    dailyRentalRate: Joi.number().min(1).max(10).required(),
    numberInStock: Joi.number().min(1).max(100).required(),
    genreId: Joi.string().required().label("Genre"),
  });

  toDoAfterValidation = () => {
    const getId =
      this.props.match.params.id != "new" ? this.props.match.params.id : "";
    const result = saveMovie({
      _id: getId,
      ...this.state.data,
    });
    this.props.history.push("/movies");
    this.setState({ data: result });
    console.log("submitted");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect(
          "genreId",
          "Genre",
          this.state.genres,
          this.handleChange,
          this.state.errors["genre"]
        )}
        {this.renderInput("numberInStock", "Number in Stock", "number")}
        {this.renderInput("dailyRentalRate", "Rate", "number")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default RegisterMovie;
