app.directive('placeCard', function(COLOR_ARRAY, ionicMaterialInk, $location) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      place: '=place',
      backgroundColor:'='
    },
    templateUrl: 'templates/placeCard.html',
    link: function(attrs, scope) {
      ionicMaterialInk.displayEffect();

      var color = COLOR_ARRAY[attrs.place.categoryId-1];
      attrs.buttonBackgroundColor = {'background-color' : color};

      attrs.bannerBorderLineColor = {'border-bottom' : '10px solid ' + color};

      attrs.seeOffers = function(id) {
        $location.path('/app/offers/'+id);
      }
    }
  }
});
