import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import './App.css';

import ListMovies from './ListMovies';
import BoxDetail from './Detail';

export default function App() {
  return (
    <Router>
      <div class="app-contain">
        <div class="app-contain-header"></div>
        <Switch>
          <Route path="/detail/:id" children={<BoxDetail />} />
          <Route path="/"> <ListMovies /> </Route>
        </Switch>
        <div class="app-contain-footer"></div>
      </div>
    </Router>
  );
}