(function() {
  'use strict';

  angular
    .module('motelNo')
    .config(routeConfig);

  function routeConfig($stateProvider, $locationProvider, $urlRouterProvider) {

/*    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });*/

    function loginRequired($q, $location, $auth, $rootScope) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        $rootScope.$emit('body:class:remove', 'hold-transition login-page');
        $rootScope.$emit('body:class:add', 'hold-transition skin-blue fixed sidebar-mini');
        $rootScope.menuUser = true;

        deferred.resolve();
      } else {

        $rootScope.$emit('body:class:remove', 'hold-transition skin-blue fixed sidebar-mini login-page');
        $rootScope.$emit('body:class:add', 'hold-transition login-page');
        $rootScope.menuUser = false;

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
        url: '/event/detail/:id',
        templateUrl: 'app/modules/Event/views/details.html',
        controller: 'DetailController',
        controllerAs: 'detailEvent',
        resolve: {
          loginRequired: loginRequired
        }
      })
      .state('eventUser', {
        url: '/event/user_list/:id',
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
