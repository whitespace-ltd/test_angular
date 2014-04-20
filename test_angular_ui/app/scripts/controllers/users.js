'use strict';

angular.module('testangulerApp')
  .controller('UsersCtrl', function ($scope, $http, $location, AuthService) {
    $scope.baseURL = 'http://localhost:3000/api';

    $scope.signin = function(isValid) {
      if(isValid){
        $http({method: 'POST', url: $scope.baseURL+'/sessions', data: $scope.user})
          .success(function(data, status){
            console.log('Good, successful login');
            if (data.api_session_token.user_id != null) {
              $scope.$root.current_user_id = data.api_session_token.user_id;
              AuthService.setCookies(data.api_session_token.token);
              $location.path('/');
            }
          })
          .error(function(data, status){
            console.log('Sorry, server error');
          })
      }
    };

    $scope.signup = function(isValid) {
      if(isValid){
        $http({method: 'POST', url: $scope.baseURL+'/users', data: $scope.user})
          .success(function(data, status){
            if(data.errors){
              console.log("there's some errors", data.errors);
            }else{
              $location.path('/users/signin');
            }
          })
          .error(function(data, status){
            console.log('Sorry, server error');
          })
      }
    };

});
