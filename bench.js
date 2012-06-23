var siege = require('siege');

var path = process.argv[2];

siege()
  .on(5000)
  .concurrent(200)
  .for(100000).times
  .get(path)
  .attack();
