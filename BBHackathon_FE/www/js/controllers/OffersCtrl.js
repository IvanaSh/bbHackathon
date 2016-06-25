app.controller('OffersCtrl', function($scope, offersService, loyaltyDiscountService, placesService, MarkerImageSrc, COLOR_ARRAY, $state) {

  $scope.products = [];
  $scope.place = {};
  placesService.getAll($state.params.placeId).then(function(response) {


    for (var i = 0; i < response.data.length; i++) {
      if (response.data[i].id + '' === $state.params.placeId) {
        $scope.place = response.data[i];
        break;
      }
    }
    offersService.getOffers($state.params.placeId).then(function(response) {

      var products = response.data;
      $scope.place.color = COLOR_ARRAY[$scope.place.categoryId - 1];
      var mapOptions = {
        center: new google.maps.LatLng($scope.place.position),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [{
          "featureType": "administrative",
          "elementType": "all",
          "stylers": [{"visibility": "simplified"}]
        }, {
          "featureType": "landscape",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#fcfcfc"}]
        }, {
          "featureType": "poi",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#fcfcfc"}]
        }, {
          "featureType": "road.highway",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
        }, {
          "featureType": "road.arterial",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
        }, {
          "featureType": "road.local",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#eeeeee"}]
        }, {
          "featureType": "water",
          "elementType": "geometry",
          "stylers": [{"visibility": "simplified"}, {"color": "#dddddd"}]
        }]
      };

      var map = new google.maps.Map(document.getElementById("map1"), mapOptions);
      map.panBy(-50, -15);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.place.position),
        map: map,
        icon: {
          url: MarkerImageSrc(7),
          scaledSize: new google.maps.Size(40, 40),
          origin: new google.maps.Point(0, 0),
        },
        optimized: false
      });

      products.forEach(function(product) {
        product.priceWithDiscount = Math.ceil(product.regularPrice * (1 - product.discount / 100));
        product.hasLoyaltyDiscount = loyaltyDiscountService.hasLoyaltyDiscount();
        product.loyaltyDiscount = loyaltyDiscountService.getLoyalDiscount();
        product.priceWithloyaltyDiscount = Math.ceil(product.priceWithDiscount * (1 - product.loyaltyDiscount / 100));
        $scope.products.push(product);
      });
    });
  })
});
