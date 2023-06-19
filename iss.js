const { builtinModules } = require("module");
const request = require("request");

const fetchMyIP = function (callback) {
  const url = "https://api.ipify.org/?format=json";
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    //if non -200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).ip;
    callback(null, data);
  });
};

module.exports = {
  fetchMyIP
};
