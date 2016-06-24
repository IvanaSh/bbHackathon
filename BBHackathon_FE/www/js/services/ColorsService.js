app.factory('colorService', function($http, COLOR_ARRAY) {
  return {
    getColors: function() {
      return COLOR_ARRAY;
    }
  }
});
