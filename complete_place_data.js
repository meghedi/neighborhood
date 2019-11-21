const PlaceData=require('./place_data.js');
/**
 * A single data class that holds all the information from PlaceData and the
 * image url.
 */
module.exports = class CompletePlaceData{
  // Note that I found composition more appropriate than inheritance as its more concise
  constructor(placeData, imgUrl = null) {
    this._placeData = placeData;
    this._imgUrl = imgUrl;
  }
}

/**
Below is an example of an inheritance route:
module.exports = class CompletePlaceData extends PlaceData{
    
  constructor(placeData, imgUrl = null) {
    //console.log("placeData",placeData);
    let vars;
    ([...vars] = Object.values(placeData));
    vars.splice(1,1,...Object.values(vars[1]));
    super(...vars);
    this._imgUrl = imgUrl;
  }
}
**/
