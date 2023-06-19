const request = require("request");

//function to get IP address
const fetchMyIP = function(callback) {
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

//function to get coordinates of a given ip address
const fetchCoordsByIP = function(ip, callback) {
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
    let coords = {};
    coords.latitude = parsedBody.latitude;
    coords.longitude = parsedBody.longitude;
    callback(null, coords);
  });
};

//function to get ISS fly over times
const fetchISSFlyOverTimes = function(coords, callback) {
  const url = ` https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  request(url, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    //if non -200 status, assume server error
    if (response.statusCode !== 200) {
      const msg = `status code ${response.statusCode} when fetching ISS fly times. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let data = JSON.parse(body).response;

    callback(null, data);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  //making the api request for getting Ip
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callback(error, null);
        }
        callback(null, passTimes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation
};
