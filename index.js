const { nextISSTimesForMyLocation } = require("./iss");


nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  for (const passTime of passTimes) {

    console.log("Next pass at " + new Date(passTime.risetime),"for " + passTime.duration + " seconds");

  }
});
