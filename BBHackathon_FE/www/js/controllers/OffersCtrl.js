app.controller('OffersCtrl', function($scope, offersService, loyaltyDiscountService) {

  $scope.products = [];

  offersService.getPlaces(1).then(function(response) {
    var products = response.data;

    products.forEach(function(product) {
      product.priceWithDiscount = Math.ceil(product.regularPrice * (1 - product.discount / 100));
      product.hasLoyaltyDiscount = loyaltyDiscountService.hasLoyaltyDiscount();
      product.loyaltyDiscount = loyaltyDiscountService.getLoyalDiscount();
      product.priceWithloyaltyDiscount = Math.ceil(product.priceWithDiscount * (1 - product.loyaltyDiscount / 100));


      $scope.products.push(product);
    })
  })





});
