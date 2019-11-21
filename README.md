# neighborhood
The solution was provided for first two tasks as I didn't get to read task3.

The class in task1 is created using composition over inheritance as its more concise that way.
I also provided an alternative code for inheritance in case that was the expectation.

Implemented [Neighborhood.getPlaces](https://github.com/qyom/neighborhood/blob/f4a9a35ecafdfc8cf9bbf3f71856c0e1a1f49ac6/neighborhood.js#L25) which calls newly created [PlaceDataServer.getNearbyPlacesData](https://github.com/qyom/neighborhood/blob/f4a9a35ecafdfc8cf9bbf3f71856c0e1a1f49ac6/place_data_server.js#L48) and then awaits for image url for each place.
Inside [PlaceDataServer.getNearbyPlaces](https://github.com/qyom/neighborhood/blob/f4a9a35ecafdfc8cf9bbf3f71856c0e1a1f49ac6/place_data_server.js#L42) we also can leverage that same getNearbyPlacesData method to extract placePairs instead of building Complete Place data.
