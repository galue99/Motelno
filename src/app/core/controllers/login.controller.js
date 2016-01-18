/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LoginController', function($rootScope, $auth, $location){

      var vm = this;
      vm.login = function() {
        var credentials = {
          username: vm.username,
          password: vm.password
        };
        // Use Satellizer's $auth service to login
        $auth.login(credentials).then(function() {
          // If login is successful, redirect to the users state
          $location.path('/');
        });
      }
    });
})();
