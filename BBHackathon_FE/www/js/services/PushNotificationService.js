app.service('pushNotificationService', ['$http',pushNotificationService]);

function pushNotificationService($http) {

  var endpoint = 'someRandomURL';

  this.sendToken = function (token) {
    var data = {
      token:token
    }
    return $http.post(endpoint + '/post',data);
  };
};
