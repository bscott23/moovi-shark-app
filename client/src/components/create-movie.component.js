import React, { Component } from "react";

class CreateMovie extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      discover: {}
    };
  }

  async componentDidMount() {
    let res = await fetch("http://localhost:5000/discover/");
    this.setState({ discover: await res.json(), isLoading: false });
  }

  render() {
    return (
      <div>
        <p>Content: Discover page for new movies</p>
        <p>
          {this.state.isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <h1>{this.state.discover[0].title}</h1>
          )}
        </p>
        <p>
          {this.state.isLoading ? (
            <h1>Loading...</h1>
          ) : (
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${
                  this.state.discover[0].poster_path
                }`}
                alt=""
              />
            </div>
          )}
        </p>
      </div>
    );
  }
}

export default CreateMovie;
