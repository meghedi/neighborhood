/**
 * LatLng object.
 *
 * Note that this design is not accurate to what latitude and
 * longitude definitionally mean, but can serve as a stand-in for a correct
 * implementation.
 */
module.exports = class LatLng {
  /**
   * Computes the euclidean distance between two "LatLng" pairs. This should be
   * an ok approximation for LatLngs that are close enough together.
   * @param {!LatLng} latLng1
   * @param {!LatLng} latLng2
   * @return {number}
   */
  static getDistance(latLng1, latLng2) {
    const latDist = Math.abs(latLng2.getLatitude() - latLng1.getLatitude());
    const lngDist = Math.abs(latLng2.getLongitude() - latLng1.getLongitude());
    return Math.sqrt(Math.pow(latDist, 2) + Math.pow(lngDist, 2));
  }

  /**
   * @param {number} latitude
   * @param {number} longitude
   */
  constructor(latitude, longitude) {
    this._latitude = latitude;
    this._longitude = longitude;
  }

  /** @return {number} */
  getLatitude() {
    return this._latitude;
  }

  /** @return {number} */
  getLongitude() {
    return this._longitude;
  }

  /** @return {string} */
  getHash() {
    return '(' + this._latitude + ',' + this._longitude + ')';
  }
}
