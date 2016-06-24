app.factory('categoriesService', function($http, CATEGORIES_JSON_PATH) {
  return {
    getCategories: function() {
      return $http.get(CATEGORIES_JSON_PATH);
    }
  }
});
