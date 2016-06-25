app.factory('offersService', function($http, OFFERS_JSON_PATH_2,OFFERS_JSON_PATH_3) {
  return {
    getOffers: function(placeId) {
      if(placeId ==="2"){
        return $http.get(OFFERS_JSON_PATH_2);
      }else if(placeId === "3"){
        return $http.get(OFFERS_JSON_PATH_3);
      }
    }
  }
});
