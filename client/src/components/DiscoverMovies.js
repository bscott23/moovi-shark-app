import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Button from "react-bootstrap/Button";
import axios from "axios";

export default class DiscoverMovies extends Component {
  constructor() {
    super();

    this.onAddMovie = this.onAddMovie.bind(this);

    this.state = {
      isLoading: true,
      discover: {}
    };
  }

  async componentDidMount() {
    const res = await fetch("http://localhost:5000/discover/");
    this.setState({ discover: await res.json(), isLoading: false });
  }

  onAddMovie(movie) {
    const newMovie = {
        username: "test-user", // placeholder until user functionality is added
        title: movie.title,
        overview: movie.overview,
        genres: movie.genres,
        release_date: movie.release_date,
        poster_path: movie.poster_path,
        movie_db_id: movie.movie_db_id,
    };
    
    axios
      .post("http://localhost:5000/watchlist/add", newMovie)
      .then(res => console.log(res.data));
  }

  mapMovieCards = () => {

    const z = this.state.discover.length - this.state.discover.length % 3;
    const cardsPerDeck = 3;
    const cardDecks = [];

    // ultimately want an array of card decks

    for (let i = 0; i < z; i += cardsPerDeck) {
      let movieSubset = this.state.discover.slice(i, i + cardsPerDeck);
      let cardSubset = movieSubset.map(movie => (
        <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}/>
              <Card.Body>
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Button variant="outline-primary" onClick={() => this.onAddMovie(movie)}>Add</Button>
              </Card.Body>
              </Card>
      ))

      const cardDeck = (<CardDeck>{cardSubset}</CardDeck>);

      cardDecks.push(cardDeck);
    }

    return (
      <div>
        {cardDecks}
      </div>
    );
  }

  render() {
    return (
      <div>
        <div>{this.state.isLoading ? (
            <h1>Loading...</h1>
          ) : this.mapMovieCards()}</div>
        <br style = {{"line-height":50}}></br>
        <div textAlign="center"><Button variant="primary" href="http://localhost:3000/watchlist/" block>Go to Watchlist</Button></div>
        <br style = {{"line-height":50}}></br>
      </div>
    );
  }
}