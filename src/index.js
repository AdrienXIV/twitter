import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./sass/style.scss";
import { HashRouter, Route, Switch } from "react-router-dom";

ReactDOM.render(
  <HashRouter basename="/">
    <Switch>
      <Route exact path="/" component={App} />
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
