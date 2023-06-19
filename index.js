const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP: ", ip);
// });

// fetchCoordsByIP(" 96.48.132.242", (error, data) => {
//   if (error) {
//     console.log("It didn't work", error);
//     return;
//   }

//   console.log("It worked!, returned Coordinates ", data);
// });

fetchISSFlyOverTimes({ latitude: '49.2767', longitude: '-123.13' }, (error, data) => {
  if (error) {
    console.log("It didn't work", error);
    return;
  }

  console.log("It worked!, returned flyover times ", data);
});
