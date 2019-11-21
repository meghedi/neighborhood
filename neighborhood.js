const PlaceDataServer = require('./place_data_server');
const ImageServer = require('./image_server');
const LatLng = require('./lat_lng');
const CompletePlaceData = require('./complete_place_data.js');

/** Finds the nearest places in the neighborhood. */
module.exports = class Neighborhood {
  /**
   * @param {!PlaceDataServer} placeServer
   * @param {!ImageServer} imageServer
   */
  constructor(placeServer, imageServer) {
    /** @private @const */
    this._placeServer = placeServer;

    /** @private @const */
    this._imageServer = imageServer;
  }

  /**
   * @param {!LatLng} latLng
   * @param {number} maxResults
   * @return {!Promise<!Array<!CompletePlaceData>>}
   */
  async getPlaces(latLng, maxResults) {
    let result = [], imgUrl;
    const placesData = this._placeServer.getNearbyPlacesData(latLng, maxResults);
    
    for (let placeData of placesData) {
      try {
        imgUrl = await this._imageServer.getImageForPlace(placeData.getPlaceName(), placeData.getLatLng());
      }catch(e) {
        console.log("errored out", e);
        imgUrl = '';
      }
      result.push(new CompletePlaceData(placeData, imgUrl));
    }
    return result;
  }
}
