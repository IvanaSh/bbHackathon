app.controller('CategoriesCtrl', function($scope, categoriesService, colorService) {

  $scope.count = 0;

  $scope.colors = colorService.getColors();

  categoriesService.getCategories().then(function(response) {
    $scope.categories = response.data;
  }, function() {
    console.log("categoriesService can't return the categories");
  })

  $scope.select = function (category) {
    category.selected = !category.selected;
    $scope.count += (category.selected ? 1 : -1);
  }

});
