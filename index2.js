const { fetchMyIp } = require("./iss_promised");

fetchMyIp().then((body) => {
  console.log(body);
});
