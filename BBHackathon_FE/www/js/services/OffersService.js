app.factory('offersService', function($http, API_ENDPOINT) {
  return {
    getOffers: function(placeId) {
      return $http.get(API_ENDPOINT + '/offers/place?placeID=' + placeId);
    }
  }
});
