import { COOKIE } from "./Cookie";
import io from "socket.io-client";
import { __URL, __SOCKET_OPTIONS } from "./info";

const socket = io.connect(__URL, __SOCKET_OPTIONS);

const socket_functions = {
  getTweets: function(count) {
    socket.emit("get_tweets", {
      token: COOKIE.getCookie("token"),
      count: Number(count)
    });
  },
  getUsers: function() {
    socket.emit("get_users", COOKIE.getCookie("token"));
  },
  getUserTweets: function(screen_name, count) {
    socket.emit("get_userTweets", {
      token: COOKIE.getCookie("token"),
      screen_name,
      count
    });
  },
  checkScreenName: function(screen_name) {
    socket.emit("get_user", {
      token: COOKIE.getCookie("token"),
      screen_name
    });
  }
};

export default {
  socket: socket,
  functions: socket_functions
};
