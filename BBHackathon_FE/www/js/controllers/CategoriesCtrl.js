app.controller('CategoriesCtrl', function($scope, categoriesService, colorService, $filter, $state) {

  $scope.count = 0;
  $scope.filters = [];

  $scope.colors = colorService.getColors();

  categoriesService.getCategories().then(function(response) {
    $scope.categories = response.data;
  }, function() {
    console.log("categoriesService can't return the categories");
  })

  $scope.select = function (category) {
    category.selected = !category.selected;
    $scope.count += (category.selected ? 1 : -1);

    // put categories in array to use filter on home screen
    if(category.selected) {
      $scope.filters.push(category.id);
    } else {
      $scope.filters = $scope.filters.filter(function(id) {
        return id !== category.id;
      });
    }
  };

  $scope.onDoneClick = function () {
      $state.go('app.map');
      $scope.$emit('doneClicked',$scope.filters);
  }

});
