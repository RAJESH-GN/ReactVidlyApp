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
    name: Joi.string().required(),
    rate: Joi.number().min(1).max(10).required(),
    stock: Joi.number().min(1).max(100).required(),
    genre: Joi.string().required(),
  });

  toDoAfterValidation = () => {
    console.log(this.state.data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("title", "Title")}
        <select
          id="genres"
          name="genre"
          className="custom-select"
          onChange={this.handleChange}
        >
          {this.state.genres.map((genre) => (
            <option className="form-control" key={genre._id} value={genre.name}>
              {genre.name}
            </option>
          ))}
        </select>
        {this.renderInput("stock", "Number in Stock", "number")}
        {this.renderInput("rate", "Rate", "number")}
        <button className="btn btn-primary" disabled={this.validate()}>
          Submit
        </button>
      </form>
    );
  }
}

export default RegisterMovie;
