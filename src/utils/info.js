let options = {
  secure: true,
  transports: ["websocket"]
};
module.exports = {
  __URL: "https://project-twitter-api.herokuapp.com", // url api
  __SOCKET_OPTIONS: { options } // socket.io options
};
