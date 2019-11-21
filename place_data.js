const LatLng = require('./lat_lng');


module.exports = class PlaceData {
  /**
   * @param {string} placeName
   * @param {number} latitude
   * @param {number} longitude
   * @param {string} address
   * @param {number} priceLevel
   * @param {number} rating
   */
  constructor(placeName, latitude, longitude, address, priceLevel, rating) {
    /** @private @const */
    this._placeName = placeName;

    /** @private @const */
    this._latLng = new LatLng(latitude, longitude);

    /** @private @const */
    this._address = address;

    /** @private @const */
    this._priceLevel = priceLevel;

    /** @private @const */
    this._rating = rating;
  }

  /** @return {string} */
  getPlaceName() {
    return this._placeName;
  }

  /** @return {!LatLng} */
  getLatLng() {
    return this._latLng;
  }

  /** @return {string} The # and street name. eg "1 Main St." */
  getAddress() {
    return this._address;
  }

  /** @return {number} The number of dollar signs (1-4). */
  getPriceLevel() {
    return this._priceLevel;
  }

  /** @return {number} The number of stars (1-5). */
  getRating() {
    return this._rating;
  }
}
