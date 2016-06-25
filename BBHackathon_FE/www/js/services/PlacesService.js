app.factory('placesService', function($http, PLACES_JSON_PATH) {
  return {
    getAll: function() {
      return $http.get(PLACES_JSON_PATH);
    },
    getPlaceById: function(placeId) {
      return this.getAll().then(function(response) {
        return response;
      });
    }
  }
});
