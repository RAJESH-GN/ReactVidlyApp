import React, { Component } from "react";
import Movies from "./movies";
import { getMovies } from "./../services/fakeMovieService";
import Pagination from "./pagination";
import ListGroup from "./../common/list-group";
import { getGenres } from "./../services/fakeGenreService";
import { paginate } from "./../common/paginate";
import _ from "lodash";
import { Router } from "react-router-dom";

class MoviesList extends Component {
  state = {
    movies: getMovies(),
    currentPage: 1,
    itemsPerPage: 4,
    genres: getGenres(),
    selectedGenre: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ genres });
  }

  handleDelete = (deleteMovie) => {
    let movies = this.state.movies.filter(
      (movie) => movie._id !== deleteMovie._id
    );
    this.setState({ movies });
  };

  handleLike = (movie) => {
    console.log("App -> handleLike -> movie", movie);
    const movies = [...this.state.movies];
    const index = this.state.movies.indexOf(movie);
    movies[index] = { ...this.state.movies[index] };
    movies[index].isLiked = !movies[index].isLiked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (selectedItem) => {
    this.setState({ selectedGenre: selectedItem, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleNewMovie = () => {
    /* this.props.history.push({
      pathname: "/movies/register",
      state: { genres: this.state.genres },
    }); */
    this.props.history.push("/movies/register");
  };
  render() {
    const { movies, currentPage, selectedGenre } = this.state;
    const filteredGenreMovies =
      selectedGenre && selectedGenre._id
        ? this.state.movies.filter(
            (movie) => movie.genre._id === selectedGenre._id
          )
        : movies;
    const sortedMovies = _.orderBy(
      filteredGenreMovies,
      [this.state.sortColumn.path],
      [this.state.sortColumn.order]
    );
    const filteredMovies = paginate(
      sortedMovies,
      currentPage,
      this.state.itemsPerPage
    );
    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <div className="btn btn-primary" onClick={this.handleNewMovie}>
            New Movie
          </div>
          <Movies
            movies={filteredMovies}
            currentPage={this.state.currentPage}
            itemsPerPage={this.state.itemsPerPage}
            onDelete={(movie) => this.handleDelete(movie)}
            onLike={(movie) => this.handleLike(movie)}
            sortColumn={this.state.sortColumn}
            onSort={(sortColumn) => this.handleSort(sortColumn)}
          />
          <Pagination
            totalItems={filteredGenreMovies.length}
            itemsPerPage={this.state.itemsPerPage}
            currentPage={this.state.currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default MoviesList;
