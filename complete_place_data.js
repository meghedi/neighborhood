const PlaceData=require('./place_data.js');
/**
 * A single data class that holds all the information from PlaceData and the
 * image url.
 */
module.exports = class CompletePlaceData{
    
  constructor(placeData, imgUrl = null) {
    this._placeData = placeData;
    this._imgUrl = imgUrl;
  }
}
