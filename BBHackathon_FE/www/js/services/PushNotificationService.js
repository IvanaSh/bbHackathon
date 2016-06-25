app.service('pushNotificationService', ['$http', pushNotificationService]);

function pushNotificationService($http) {

  var endpoint = 'https://bbhackathon.herokuapp.com/random/send';

  this.sendToken = function (token) {
    var data = {
      token: token
    }
    return $http.post(endpoint + '/post', data);
  };
};
