import React, { Component } from "react";
import Form from "./form";
import Joi from "@hapi/joi";
import { getGenres } from "./../services/fakeGenreService";

class RegisterMovie extends Form {
  state = {
    data: { title: "", stock: "", rate: "", genre: "" },
    errors: {},
    genres: getGenres(),
  };

  schema = Joi.object({
    title: Joi.string().required(),
    rate: Joi.number().min(1).max(10).required(),
    stock: Joi.number().min(1).max(100).required(),
    genre: Joi.string().required().label("Genre"),
  });

  toDoAfterValidation = () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        {this.renderSelect(
          "genre",
          "Genre",
          this.state.genres,
          this.handleChange,
          this.state.errors["genre"]
        )}
        {this.renderInput("stock", "Number in Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default RegisterMovie;
