import React from "react";
import axios from "axios";
import { COOKIE } from "../utils/Cookie";
import $ from "jquery";
import { __URL } from "./info";

class API extends React.Component {
  /**
   *
   * @param {String} email
   * @param {String} password
   */
  login(email, password) {
    return axios.request({
      url: __URL + "/login",
      method: "POST",
      data: {
        email,
        password
      }
    });
  }

  /**
   * Ajouter un nouvel utilisateur twitter
   * @param {String} name
   * @param {Number} order
   */
  setUser(name, order) {
    return axios.request({
      url: __URL + "/api/user/new",
      method: "POST",
      data: {
        name,
        order
      },
      headers: {
        token: COOKIE.getCookie("token")
      }
    });
  }

  /**
   * Récupérer les utilisateurs enregistrés dans la BDD
   */
  getUsers() {
    return axios.request({
      url: __URL + "/api/user/",
      method: "GET",
      headers: {
        token: COOKIE.getCookie("token")
      }
    });
  }

  /**
   * Requête synchrone de vérification du jeton
   */
  checkAuth() {
    return $.ajax({
      type: "GET",
      url: __URL + "/api",
      cache: false,
      headers: {
        token: COOKIE.getCookie("token")
      },
      async: false
    });
  }
}

export default new API();