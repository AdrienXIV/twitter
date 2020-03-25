import React from "react";
import { COOKIE } from "../utils/Cookie";
import { Redirect } from "react-router-dom";

export const Logout = function() {
  COOKIE.setCookie("token", "", 0);
  return <Redirect to="/login"></Redirect>;
};
