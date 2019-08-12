import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar"
import MoviesList from "./components/Watchlist";
import DiscoverMovies from "./components/DiscoverMovies";
import CreateUser from "./components/CreateUser";

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Route path="/watchlist" exact component={MoviesList} />
        <Route path="/discover" component={DiscoverMovies} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;