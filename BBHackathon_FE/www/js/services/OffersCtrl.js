app.factory('offersService', function($http, OffersJSONPath) {
  return {
    getPlaces: function(placeId) {
      return $http.get(OffersJSONPath(placeId));
    }
  }
});
