import React, { Component } from "react";
import { Link } from "react-router-dom";
import Like from "./like";
import TableHead from "./../common/tableHead";
import TableBody from "../common/tableBody";

class Movies extends Component {
  render() {
    const { length: count } = this.props.movies;
    const columns = [
      {
        path: "title",
        label: "Title",
        content: (movie) => (
          <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
        ),
      },
      { path: "genre.name", label: "Genre" },
      { path: "numberInStock", label: "Stock" },
      { path: "dailyRentalRate", label: "Rate" },
      {
        key: "like",
        content: (movie) => (
          <Like
            liked={movie?.isLiked}
            onClick={() => this.props.onLike(movie)}
          />
        ),
      },
      {
        key: "delete",
        content: (movie) => (
          <button
            className="btn btn-danger"
            onClick={() => this.props.onDelete(movie)}
          >
            Delete
          </button>
        ),
      },
    ];
    if (count === 0) return <p>No Movies present for this subscription</p>;
    return (
      <React.Fragment>
        <p>Showing {count} movies from the database</p>
        <table className="table">
          <TableHead
            onSort={this.props.onSort}
            sortColumn={this.props.sortColumn}
            columns={columns}
          />
          <TableBody columns={columns} items={this.props.movies} />
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
