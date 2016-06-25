app.factory('placesService', function($http, API_ENDPOINT) {
  return {
    getAll: function() {
      return $http.get(API_ENDPOINT + 'places');
    },
    getPlaceById: function(placeId) {
      return this.getAll().then(function(response) {
        return response.data[0];
      });
    }
  }
});
