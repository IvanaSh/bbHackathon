app.controller('MapCtrl', function ($scope, $rootScope, placesService, DEFAULT_GPS_POSITION, MarkerImageSrc) {

  $scope.show = false;
  $scope.mapOpacity = 1.0;
  $scope.markers = [];
  $scope.places = [];
  $scope.categories = [];

  var mapOptions = {
    center: new google.maps.LatLng(DEFAULT_GPS_POSITION),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    disableDefaultUI: true,
    styles: [{"featureType":"administrative","elementType":"all","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#fcfcfc"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#dddddd"}]}]
  };

  function init() {
    $scope.categories = [];
    clearPlaces();
    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    placesService.getAll().then(function (response) {
      $scope.places = response.data;
      $scope.places = getSubListOfPlaces($scope.places, $scope.categories);
      renderMap($scope.places);
    });
  };

  function getSubListOfPlaces(places, categories) {
    var list = [];

    if(categories == 0) return places;
    for (var i = 0; i < categories.length; i++) {
      places.map(function (place) {
         if(categories[i] === place.category) {
             list.push(place);
         }
      });
    }
    return list;
  }

  function clearPlaces() {
      $scope.markers.forEach(function(m) {
            m.setMap(null);
      });
  };

  $rootScope.$on('doneClicked', function(categories) {
     clearPlaces();
     placesService.getAll().then(function (response) {
      $scope.places = response.data;
          $scope.categories = categories.targetScope.filters;
          $scope.places = getSubListOfPlaces($scope.places, $scope.categories);
          renderMap($scope.places);
     });
   });

  function renderMap(markers) {
    markers.forEach(function (marker) {
      var categoryIcon = {
        url: MarkerImageSrc(marker.category),
        scaledSize: new google.maps.Size(50, 50),
        origin: new google.maps.Point(0, 0),
      }

      var m = new google.maps.Marker({
        position: marker.position,
        map: $scope.map,
        icon: categoryIcon,
        optimized: false,
        title: $scope.markers.length.toString()
      });

      m.addListener('click', function () {
        onMarkerClickEvent.call(m, marker);
        $rootScope.$apply();
      });

      $scope.markers.push(m);
    });
  }

  function onMarkerClickEvent(marker) {
    $scope.map.setCenter(this.getPosition());
    $scope.map.panBy(0, -270);
    this.setAnimation(google.maps.Animation.BOUNCE);
    this.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
    $scope.show = true;
    $scope.mapOpacity = 0.5;
    $scope.place = marker;
    $scope.place.close = function () {
      $scope.show = false;
      $scope.mapOpacity = 1.0;
      this.setAnimation(null);
    }.bind(this)
  }

    init();
});
