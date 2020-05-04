import React, { Component } from "react";
import Movies from "./components/movies";
import { getMovies } from "./services/fakeMovieService";
import Pagination from "./components/pagination";
import ListGroup from "./common/list-group";
import { getGenres } from "./services/fakeGenreService";
import { paginate } from "./common/paginate";
import _ from "lodash";

class App extends Component {
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
    console.log("App -> handleSort -> sortColumn", sortColumn);
    this.setState({ sortColumn });
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
      <main className="container">
        <div className="row">
          <div className="col-3">
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.selectedGenre}
              onGenreSelect={this.handleGenreSelect}
            />
          </div>
          <div className="col">
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
      </main>
    );
  }
}

export default App;
