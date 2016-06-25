app.service('pushNotificationService', ['$http', pushNotificationService]);

function pushNotificationService($http) {

  var endpoint = 'https://bbhackathon.herokuapp.com/token';

  this.sendToken = function (token) {
    var data = {
      userId: 1,
      token: token
    }
    return $http.post(endpoint, data);
  };
};
