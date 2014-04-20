'use strict';

angular
  .module('testangulerApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/welcome', {
        templateUrl: 'views/welcome.html',
        controller: 'WelcomeCtrl',
        publicAccess : true
      })
      .when('/users/signin', {
        templateUrl: 'views/users/signin.html',
        controller: 'UsersCtrl',
        publicAccess : true
      })
      .when('/users/signup', {
        templateUrl: 'views/users/signup.html',
        controller: 'UsersCtrl',
        publicAccess : true
      })
      .otherwise({
        redirectTo: '/'
      });

  }).run(function ($rootScope, $route, $location, AuthService, $cookieStore, $http) {
      var authorization_token = $cookieStore.get('authorization');
      $http.defaults.headers.common["AUTHORIZATION"] = $cookieStore.get('authorization');

      $rootScope.$on('$routeChangeStart', function(event, next, current) {
        var publicAccess = next.publicAccess || false;
        AuthService.check().then(function() {
          if(publicAccess)
            $location.path('/');
        }, function() {
          if (!publicAccess)
            $location.path('/welcome');
        });

      });

  })
