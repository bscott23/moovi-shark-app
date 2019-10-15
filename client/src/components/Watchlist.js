import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import LabelList from "./LabelList";

const Movie = props => (
  <tr>
    <td>{props.movie.title}</td>
    <td>{props.movie.overview}</td>
    <td>{props.movie.release_date.substring(0, 10)}</td>
    <td>
      <a
        href="#"
        onClick={() => {
          props.deleteMovie(props.movie._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class MoviesList extends Component {
  constructor(props) {
    super(props);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.state = { movies: [] };
  }

  componentDidMount() {
    axios
      .get("/watchlist/")
      .then(response => {
        this.setState({ movies: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteMovie(id) {
    axios
      .delete("/watchlist/" + id)
      .then(res => console.log(res.data));
    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    });
  }

  movieList() {
    return this.state.movies.map(currentmovie => {
      return (
        <Movie
          movie={currentmovie}
          deleteMovie={this.deleteMovie}
          key={currentmovie._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Movies</h3>
        <Link to="/label-list" className="btn btn-primary btn-sm">Manage Labels</Link>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Title</th>
              <th>Overview</th>
              <th>Release Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{this.movieList()}</tbody>
        </table>
      </div>
    );
  }
}