'use strict';

angular.module('testangulerApp')
  .controller('MainCtrl', function ($scope, $http, $location, AuthService) {

    $scope.baseURL = 'http://localhost:3000/api'
    AuthService.check().then(function (resp) {
      $http({method: 'GET', url: $scope.baseURL+'/users/'+resp.api_session_token.user_id})
        .success(function (resp, status) {
          $scope.user = resp.user;
        });
    }, function (resp) {
      $location.path('/welcome');
    });

    $scope.signout = function () {
      AuthService.signout();
    }
  });
