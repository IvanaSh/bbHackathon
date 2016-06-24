app.factory('offersService', function($http, OffersJSONPath) {
  return {
    getOffers: function(placeId) {
      return $http.get(OffersJSONPath(placeId));
    },

  }
});
