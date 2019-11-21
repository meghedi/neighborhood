const fs = require('fs');
const readline = require('readline');
const LatLng = require('./lat_lng');
const PlacePair = require('./place_pair');

/**
 * Image Server (IS).
 */

module.exports = class ImageServer {
  constructor() {
    /**
     * Maps a PlacePair hash to a list of image URLs.
     * @private @type {Object<string, string>}
     */
    this._imageUrls = {};
    this.wierd="shit";
  }

  /**
   * @param {string} placeName
   * @param {!LatLng} latLng
   * @returns {!Promise<string>}
   */
  getImageForPlace(placeName, latLng) {
    return new Promise(resolve => {
      setTimeout(
          () => {
            const place = new PlacePair(placeName, latLng);
            resolve(this._imageUrls[place.getHash()]);
          },
          1100);  // DO NOT REMOVE: Simulates network latency.
    });
  }

  aaa() {
    return "aaa";
  }

  /**
   * @param {string} fileName
   * @return {!Promise}
   */
  initializeServer(fileName) {
    const reader = readline.createInterface({
      input: fs.createReadStream(fileName),
    });

    reader.on('line', line => this._addImageToServer(line));
    return new Promise(resolve => reader.on('close', resolve));
  }

  /**
   * @param {string} line
   * @private
   */
  _addImageToServer(line) {
    const parsedLine = line.split(',');
    const latLng =
        new LatLng(parseFloat(parsedLine[1]), parseFloat(parsedLine[2]));
    const placePair = new PlacePair(parsedLine[0], latLng);
    this._imageUrls[placePair.getHash()] = parsedLine[3];
  }
}
