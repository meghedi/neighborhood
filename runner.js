const PlaceDataServer = require('./place_data_server');
const ImageServer = require('./image_server');
const Neighborhood = require('./neighborhood');
const LatLng = require('./lat_lng');


async function main() {
  const placeDataServer = new PlaceDataServer();
  await placeDataServer.initializeServer('place_data.csv');

  const imageServer = new ImageServer();
  await imageServer.initializeServer('image_data.csv');

  const neighborhood = new Neighborhood(placeDataServer, imageServer);

  console.log('~~~~~~~~~~~A new Server is running.!!');

  console.log('*** getPlacesWithName:');
  console.log(placeDataServer.getPlacesWithName('Starbucks'));

  console.log('*** getPlaceAt:');
  console.log(
      placeDataServer.getPlaceAt('Starbucks', new LatLng(100, -200)));

  const image =
      await imageServer.getImageForPlace('Starbucks', new LatLng(100, -200));
  console.log('*** getImageForPlace:');
  console.log(image);

  console.log('*** getNearbyPlaces:');
  console.log(placeDataServer.getNearbyPlaces(new LatLng(100, -200), 2));

  console.log('*** getPlaces:');
  console.log("Places1", await neighborhood.getPlaces(new LatLng(100, -200), 4));
  console.log("Places2", await neighborhood.getPlaces(new LatLng(120, -220), 4));
  
  // Feel free to add more console.logs here in order to test your code and see
  // how things are working.

  setTimeout(() => {
    console.log('~~~~~~~~~~~Server stops.');
  }, 11000);
}

main();
