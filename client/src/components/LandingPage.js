import React, { Component } from "react";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class LandingPage extends Component {
  render() {
    return (
      <Jumbotron>
        <h1 class="display-4">Welcome to MooviShark 🦈</h1>
        <p class="lead">
          MooviShark is a streamlined movie discovery app. It limits superflouous details to keep you focused on consuming the latest, most popular movies.
        </p>
        <hr class="my-4" />
        <p>
          Start browsing movies now to add them to your Watchlist. 
        </p>
        <p class="lead">
          <a class="btn btn-primary btn-lg" href="/discover/" role="button">
            Watch movies like a shark
          </a>
        </p>
      </Jumbotron>
    );
  }
}
