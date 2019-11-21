/** A data object that holds the placeName and its latLng information. */
module.exports = class PlacePair {
  /**
   * @param {string} placeName
   * @param {!LatLng} latLng
   */
  constructor(placeName, latLng) {
    this.placeName = placeName;
    this.latLng = latLng;
  }

  /** @return {string} */
  getPlaceName() {
    return this.placeName;
  }

  /** @return {!LatLng} */
  getLatLng() {
    return this.latLng;
  }

  /** @return {string} */
getHash() {
    return this.placeName + this.latLng.getHash();
  }

  /**
   * @param {!PlacePair} other
   * @return {boolean}
   */
  equals(other) {
    return this.getHash() === other.getHash();
  }
}
