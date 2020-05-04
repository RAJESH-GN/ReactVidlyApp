import React, { Component } from "react";
import Like from "./like";
import TableHead from "./../common/tableHead";
import TableBody from "../common/tableBody";

class Movies extends Component {
  render() {
    const { length: count } = this.props.movies;
    const columns = [
      { path: "title", label: "Title" },
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
          {/* <tbody>
            {this.props.movies.map((movie) => (
              <tr key={movie._id}>
                <td>{movie.title}</td>
                <td>{movie.genre.name}</td>
                <td>{movie.numberInStock}</td>
                <td>{movie.dailyRentalRate}</td>
                <td>
                  <Like
                    liked={movie?.isLiked}
                    onClick={() => this.props.onLike(movie)}
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.props.onDelete(movie)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </React.Fragment>
    );
  }
}

export default Movies;
