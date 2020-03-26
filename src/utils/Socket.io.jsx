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
  }
};

export default {
  socket: socket,
  functions: socket_functions
};
