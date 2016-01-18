(function() {
  'use strict';

  angular
    .module('motelNo')
    .config(routeConfig);

  function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {

    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/core/login/login.html',
        controller: 'LoginController',
        controllerAs: 'login'
      })
      .state('logout', {
        url: '/logout',
        templateUrl: 'app/core/login/login.html',
        controller: 'LogoutController',
        template: null,
        controllerAs: 'logout',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('main', {
        url: '/',
        templateUrl: 'app/modules/Event/views/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('eventDetails', {
        url: '/event/:id',
        templateUrl: 'app/modules/Event/views/details.html',
        controller: 'DetailController',
        controllerAs: 'detailEvent',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('eventUser', {
        url: '/event/:id',
        templateUrl: 'app/modules/Event/views/users_list.html',
        controller: 'UserListController',
        controllerAs: 'mainUserList',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('users', {
        url: '/users',
        templateUrl: 'app/modules/Users/views/users.html',
        controller: 'UserController',
        controllerAs: 'mainUser',
        resolve: {
          loginRequired: loginRequired
        }
      });
      $urlRouterProvider.otherwise('/');
  }

})();
