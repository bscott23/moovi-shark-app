import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import LandingPage from "./components/LandingPage";
import MoviesList from "./components/Watchlist";
import DiscoverMovies from "./components/DiscoverMovies";
import CreateUser from "./components/CreateUser";
import LabelManager from "./components/LabelManager";

function App() {
  return (
    <Router>
        <div className="container">
          <Navbar />
          <br />
          <Route path="/" exact component={LandingPage} />
          <Route path="/home" component={LandingPage} />
          <Route path="/watchlist" component={MoviesList} />
          <Route path="/discover" component={DiscoverMovies} />
          <Route path="/user" component={CreateUser} />
          <Route path="/label-manager" component={LabelManager} />
        </div>
    </Router>
  );
}

export default App;
