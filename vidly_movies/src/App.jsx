import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import Header from "./common/header";
import MoviesList from "./components/movies-list";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import MovieDetails from "./components/movieDetails";
import NotFound from "./components/notFound";
import LoginForm from "./components/loginForm";
import RegisterMovie from "./components/registerMovie";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Header />
        <main className="container">
          <Switch>
            <Route path="/login" component={LoginForm} />
            <Route path="/movies/register" component={RegisterMovie} />
            <Route path="/movies/:id" component={MovieDetails} />
            <Route path="/movies" component={MoviesList} />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/movies" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
