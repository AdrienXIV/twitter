import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/style.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <Router basename="/">
    <Switch>
      <Route exact path="/twitter" component={App} />
    </Switch>
  </Router>,
  document.getElementById("root")
);
