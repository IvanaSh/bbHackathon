app.factory('placesService', function($http, PLACES_JSON_PATH) {
  return {
    getPlaces: function() {
      return $http.get(PLACES_JSON_PATH);
    }
  }
});
