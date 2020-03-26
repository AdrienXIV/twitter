let options = {
  secure: true,
  transports: ["websocket"],
  autoConnect: false
};
let url_api = "https://project-twitter-api.herokuapp.com";
module.exports = {
  __URL: url_api, // url api
  __SOCKET_OPTIONS: { options } // socket.io options
};
