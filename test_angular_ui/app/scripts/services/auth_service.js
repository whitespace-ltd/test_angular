angular.module('testangulerApp')
  .factory('AuthService', function ($rootScope, $cookies, $http, $cookieStore, $q, $location) {
    return {
      check: function () {
        checkDfd = $q.defer();

        // if ($cookieStore.get('authorization')) {
        //   checkDfd.resolve();
        // };

        $http({method: 'GET', url: 'http://localhost:3000/api/sessions'})
          .success(function (resp) {
            if (resp.api_session_token.user_id != null) {
              checkDfd.resolve.call(this, resp);
            }else{
              checkDfd.reject.call(this, resp);
            }
          })
          .error(function (resp) {
            $cookieStore.remove('authorization');
            delete $http.defaults.headers.common["AUTHORIZATION"];
            checkDfd.reject.call(this, resp);
          })

        return checkDfd.promise;
      },
      setCookies: function (token) {
        $cookieStore.put('authorization', token);
        $http.defaults.headers.common["AUTHORIZATION"] = token;
      },
      signout: function () {
        $http({method: 'DELETE', url: 'http://localhost:3000/api/sessions'})
        .success(function () {
          $cookieStore.remove('authorization');
          delete $http.defaults.headers.common["AUTHORIZATION"];
          $location.path('/welcome');
        });

      }
    }
  });
