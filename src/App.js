import React from "react";
import { COOKIE } from "./utils/Cookie";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { Logout } from "./components/Logout";
import { NewUser } from "./components/NewUser";
import { Twitter } from "./components/Twitter";
import { Navbar } from "./components/Navbar";
import { Users } from "./components/Users";
import API from "./utils/API";
import io from "./utils/Socket.io";

/*const PageNotFound = () => {
  return <h1>404</h1>;
};*/
const ProtectedRoute = ({ ...props }) => {
  let socketAuth = true;
  io.socket.on("unauthorized", res => {
    res === 0 ? (socketAuth = false) : (socketAuth = true);
  });
  // redirection si jamais le token envoyé dans les sockets est erroné
  if (socketAuth) {
    // réponse synchrone du serveur
    return API.checkAuth().responseText === "JsonWebTokenError" ||
      COOKIE.getCookie("token").length < 200 ? (
      <Redirect to="/login" />
    ) : (
      <Route {...props} />
    );
  } else {
    return <Redirect to="/login" />;
  }
};

const App = () => {
  return (
    <Router basename="/twitter/">
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <ProtectedRoute
          isAllowed={COOKIE.getCookie("token")}
          exact
          path="/"
          component={Home}
        />
        <ProtectedRoute
          isAllowed={COOKIE.getCookie("token")}
          exact
          path="/users"
          component={Users}
        />
        <ProtectedRoute
          isAllowed={COOKIE.getCookie("token")}
          exact
          path="/new"
          component={NewUser}
        />
        <ProtectedRoute
          isAllowed={COOKIE.getCookie("token")}
          exact
          path="/twitter"
          component={Twitter}
        />
        <ProtectedRoute
          isAllowed={COOKIE.getCookie("token")}
          exact
          path="/twitter/:id"
          component={Twitter}
        />

        <Route path="*">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
