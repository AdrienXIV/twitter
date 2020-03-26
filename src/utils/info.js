let options = {
  //secure: false,
  //transports: ["websocket"],
  autoConnect: false
};
let url_api = "https://project-twitter-api.herokuapp.com";
module.exports = {
  __URL: "http://localhost:3000", // url api
  __SOCKET_OPTIONS: { options } // socket.io options
};
