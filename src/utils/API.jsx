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
   *
   * get
   *
   */

  //Récupérer les utilisateurs enregistrés dans la BDD
  getUsers() {
    return axios.request({
      url: __URL + "/api/user/",
      method: "GET",
      headers: {
        token: COOKIE.getCookie("token")
      }
    });
  }
  getUser(id) {
    return axios.request({
      url: __URL + "/api/user/" + id,
      method: "GET",
      headers: {
        token: COOKIE.getCookie("token")
      }
    });
  }

  /**
   *
   * set
   *
   */

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
   * Modifier l'ordre d'un utilisateur twitter
   * @param {Number} order
   * @param {String} id
   */
  editUser(order,isBan, id) {
    return axios.request({
      url: __URL + "/api/user/" + id,
      method: "PATCH",
      data: {
        order,
        isBan
      },
      headers: {
        token: COOKIE.getCookie("token")
      }
    });
  }

  deleteUser(id) {
    return axios.request({
      url: __URL + "/api/user/" + id,
      method: "DELETE",
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
