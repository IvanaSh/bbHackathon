app.controller('OffersCtrl', function($scope, offersService, loyaltyDiscountService, placesService, MarkerImageSrc, COLOR_ARRAY) {

  $scope.products = [];

  offersService.getOffers(1).then(function(response) {

    var products = response.data;
    placesService.getPlaceById(1).then(function(data) {
      $scope.place = data;
      $scope.place.color = COLOR_ARRAY[$scope.place.category - 1];
      var mapOptions = {
        center: new google.maps.LatLng($scope.place.position),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        disableDefaultUI: true,
        styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]}]
      };

     var map = new google.maps.Map(document.getElementById("map1"), mapOptions);
      map.panBy(-50, -15);

      var marker = new google.maps.Marker({
        position: new google.maps.LatLng($scope.place.position),
        map: map,
        icon: {
          url: MarkerImageSrc($scope.place.category),
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
