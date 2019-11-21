const fs = require('fs');
const readline = require('readline');
const PlaceData = require('./place_data');
const PlacePair = require('./place_pair');
const LatLng = require('./lat_lng');


module.exports = class PlaceDataServer {
  constructor() {
    /** @private @const {Object<string, !Array<!PlaceData>>} */
    this._places = {}
  }

  /**
   * @param {string} placeName
   * @return {!Array<!PlaceData>}
   */
  getPlacesWithName(placeName) {
    return this._places[placeName] || [];
  }

  /**
   * @param {string} placeName
   * @param {!LatLng} latLng
   * @return {?PlaceData}
   */
  getPlaceAt(placeName, latLng) {
    const places = this._places[placeName] || null;
    for (const place of places) {
      if (LatLng.getDistance(latLng, place.getLatLng()) <= 1E-7) {
        return place;
      }
    }
    return null;
  }

  /**
   * @param {!LatLng} latLng
   * @param {number} maxResults
   * @return {!Array<!PlacePair>}
   */
  getNearbyPlaces(latLng, maxResults) {
    return this.getNearbyPlacesData(latLng, maxResults).map(placeData => {
      return new PlacePair(placeData.getPlaceName(), placeData.getLatLng());
    });
  }

  getNearbyPlacesData(latLng, maxResults) {
    let places = [];
    Object.values(this._places).forEach(locations => {
      locations.forEach(placeData=>{        
        places.push(placeData);
      })
    });
    
    places.sort( (place1, place2) => {
      const distance1 = LatLng.getDistance(latLng, place1.getLatLng());
      const distance2 = LatLng.getDistance(latLng, place2.getLatLng());
      return Math.sign(distance1 - distance2);
    } );
    return places.slice(0,maxResults);
  }



  /**
   * @param {string} fileName
   * @return {!Promise}
   */
  initializeServer(fileName) {
    const reader = readline.createInterface({
      input: fs.createReadStream(fileName),
    });

    reader.on('line', line => this._addPlaceDataToServer(line));
    return new Promise(resolve => reader.on('close', resolve));
  }

  /**
   * @param {string} line
   * @private
   */
  _addPlaceDataToServer(line) {
    const parsedLine = line.split(',');
    const placeData = new PlaceData(
        parsedLine[0],
        parseFloat(parsedLine[1]),
        parseFloat(parsedLine[2]),
        parsedLine[3],
        parseInt(parsedLine[4], 10),
        parseFloat(parsedLine[5]),
    );

    if (!this._places[parsedLine[0]]) {
      this._places[parsedLine[0]] = [];
    }

    this._places[parsedLine[0]] = [...this._places[parsedLine[0]], placeData];
  }
}
