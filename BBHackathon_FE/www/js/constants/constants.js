app
  .constant('COLOR_ARRAY', [
    "#B03129",
    "#AB2E7B",
    "#EDD24C",
    "#2B59B4",
    "#247B3B",
    "#652480",
    "#612d2d"
  ])
  .constant('DEFAULT_GPS_POSITION', {
    lat: 52.377838,
    lng: 4.890014
  })
  .constant('API_ENDPOINT', 'https://bbhackathon.herokuapp.com/')
  .constant('MarkerImageSrc', function(id) {
    return 'img/mapImgs/markers/marker_' + id + '.png';
  })
  .constant('OffersJSONPath', function(id) {
    return 'data/offers_placeId' + id + '.json';
  })
  .constant('API_KEY', '6e44c855f8bb700398820bc37a01ff6c')
  .constant('API_ENDPOINT', 'http://api.themoviedb.org/3/')
  .constant('CATEGORIES_JSON_PATH', 'data/categories.json')
  .constant('PLACES_JSON_PATH', 'data/places.json')
;
