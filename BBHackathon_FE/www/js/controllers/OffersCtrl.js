app.controller('OffersCtrl', function($scope, offersService) {


  offersService.getPlaces(1).then(function(response) {
    $scope.products = response.data;
  })


});
