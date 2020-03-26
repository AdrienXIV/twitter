let options = {
 // secure: true,
 // transports: ["websocket"],
  autoConnect: false
};
let url_api = "https://project-twitter-api.herokuapp.com";
module.exports = {
  __URL: "http://127.0.0.1:3000", // url api
  __SOCKET_OPTIONS: { options } // socket.io options
};
