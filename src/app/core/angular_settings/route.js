(function() {
  'use strict';

  angular
      .module('motelNo')
      .config(routeConfig);

  function routeConfig($routeProvider, $locationProvider) {

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
    $routeProvider
        .when('/login', {
          templateUrl: 'app/core/login/login.html',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .when('/', {
          templateUrl: 'app/modules/Event/views/main.html',
          controller: 'MainController',
          controllerAs: 'main',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/event/details/:id', {
          templateUrl: 'app/modules/Event/views/details.html',
          controller: 'DetailController',
          controllerAs: 'detailEvent',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/createEvent', {
          templateUrl: 'app/modules/Event/views/create.html',
          controller: 'CreateController',
          controllerAs: 'createEvent',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/event/user_list/:id', {
          templateUrl: 'app/modules/Event/views/users_list.html',
          controller: 'UserListController',
          controllerAs: 'mainUserList',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/editEvent/:id', {
          templateUrl: 'app/modules/Event/views/edit.html',
          controller: 'EditController',
          controllerAs: 'editEvent',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/event/generate_code/:id', {
          templateUrl: 'app/modules/Event/views/generate_code.html',
          controller: 'CodeController',
          controllerAs: 'geneCode',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/users/', {
          templateUrl: 'app/modules/Users/views/users.html',
          controller: 'UserController',
          controllerAs: 'mainUser',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/createUsers/', {
          templateUrl: 'app/modules/Users/views/create.html',
          controller: 'CreateUserController',
          controllerAs: 'createUser',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .when('/user/editUsers/:id', {
          templateUrl: 'app/modules/Users/views/edit.html',
          controller: 'EditUserController',
          controllerAs: 'editUser',
          resolve: {
            loginRequired: loginRequired
          }
        })
        .otherwise({
          redirectTo: '/login'
          //$urlRouterProvider.otherwise('/login');

        });


  }

})();
