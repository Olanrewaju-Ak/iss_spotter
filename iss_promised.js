const request = require("request-promise-native");

const fetchMyIp = function () {
  return request("https://api.ipify.org/?format=json");
};

module.exports = {
  fetchMyIp
};
