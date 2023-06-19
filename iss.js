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

const fetchCoordsByIP = function (ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    //parse the returned body so we can check its information
    const parsedBody = JSON.parse(body);
    //check if 'success' is true or not
    if (!parsedBody.success) {
      const message = `success status was ${parsedBody.success}. server message says ${parsedBody.message} when fetching for IP ${parsedBody.ip}`;
      callback(Error(message), null);
      return;
    }
    //creating a data object
    data = {};
    data.latitude = parsedBody.latitude;
    data.longitude = parsedBody.longitude;
    callback(null, data);
  });
};

module.exports = {
  fetchMyIP,
  fetchCoordsByIP
};
