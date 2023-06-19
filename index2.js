const { nextISStimesForMyLocation } = require("./iss_promised");

nextISStimesForMyLocation()
  .then((data) => {
    for (const item of data) {
      console.log("Next pass at " + new Date(item.risetime), "for " + item.duration + " seconds");
    }
  })
  .catch((error) => {
    console.log("It didn't work: ", error.message);
  });
