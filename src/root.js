import React, { Component } from 'react';
import App from './App';
import MovieDetails from './MovieDetails';
import TopMovies from './TopMovies';
import TvShows from './tvShows';
import ShowDetails from './ShowDetails';

import { BrowserRouter as Router, Route, Link } from "react-router-dom";
const Root=()=>(
<Router>
  <div>
<Route exact path="/" component={App}></Route>
<Route path="/TopMovies" component={TopMovies}></Route>
<Route path="/MovieDetails" component={MovieDetails}></Route>
<Route path="/ShowDetails" component={ShowDetails}></Route>
<Route path="/tvShows" component={TvShows}></Route>

  </div>
</Router>
);


export default Root;
