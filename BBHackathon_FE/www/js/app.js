// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'ionic-material']);
var Push;
var globalPushNotificationService;
var globalState;
app.run(['$ionicPlatform','$state','pushNotificationService',function ($ionicPlatform, $state, pushNotificationService) {
  globalPushNotificationService = pushNotificationService;
  globalState = $state;
  $ionicPlatform.ready(function () {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

    if(ionic.Platform.platform()!=='win32'){
      var androidConfig = {
        'senderID': '91101716832',
        'sound': true,
        'vibrate': true
      };
      Push = PushNotification.init({
        "android": androidConfig
      });

      Push.on('registration', function(data) {
        // device token:
        var deviceToken = data.registrationId;
        console.log('pushToken', deviceToken);
        globalPushNotificationService.sentdoken(deviceToken);
      });



      Push.on('error', function(e) {
        console.error('Notifications error: ', e.message, e);
      });


      Push.on('notification', function(response){
        console.log('norification', response)
        console.log('any additinal data the push recieved', response.additionalData);

        switch (response.case) {
          case '1':
            globalState.go('');
            break;
          case '2':
            globalState.go('');
            break;
          default:
        }
      });
    }

    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}])

app.config(function ($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.mapCategories', {
      url: '/categories',
      views: {
        'menuContent': {
          templateUrl: 'templates/categories.html',
          controller: 'CategoriesCtrl'
        }
      }
    })

    .state('app.map', {
      url: '/map',
      views: {
        'menuContent': {
          templateUrl: 'templates/map.html',
          controller: 'MapCtrl'
        }
      }
    })

    .state('app.offers', {
      url: '/offers/:placeId',
      views: {
        'menuContent': {
          templateUrl: 'templates/offers.html',
          controller: 'OffersCtrl'
        }
      }
    })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/map');
});
