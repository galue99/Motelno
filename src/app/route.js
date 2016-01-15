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

    $routeProvider
      .when('/', {
        templateUrl: 'app/Event/views/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .when('/event/details/:id', {
        templateUrl: 'app/Event/views/details.html',
        controller: 'DetailController',
        controllerAs: 'detailEvent'
      })
      .when('/createEvent', {
        templateUrl: 'app/Event/views/create.html',
        controller: 'CreateController',
        controllerAs: 'createEvent'
      })
      .when('/event/user_list/:id', {
        templateUrl: 'app/Event/views/users_list.html',
        controller: 'UserListController',
        controllerAs: 'mainUserList'
      })
      .when('/editEvent/:id', {
        templateUrl: 'app/Event/views/edit.html',
        controller: 'EditController',
        controllerAs: 'editEvent'
      })
      .when('/event/generate_code/:id', {
        templateUrl: 'app/Event/views/generate_code.html',
        controller: 'CodeController',
        controllerAs: 'geneCode'
      })
      .when('/users/', {
        templateUrl: 'app/Users/views/users.html',
        controller: 'UserController',
        controllerAs: 'mainUser'
      })
      .when('/createUsers/', {
        templateUrl: 'app/Users/views/create.html',
        controller: 'CreateUserController',
        controllerAs: 'createUser'
      })
      .when('/user/editUsers/:id', {
        templateUrl: 'app/Users/views/edit.html',
        controller: 'EditUserController',
        controllerAs: 'editUser'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
