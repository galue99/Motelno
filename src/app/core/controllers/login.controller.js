/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LoginController', function($rootScope, $auth, $location, toastr){

      var vm = this;
      vm.login = function() {
        var credentials = {
          username: vm.username,
          password: vm.password
        };



        // Use Satellizer's $auth service to login
        $auth.login(credentials)
        .then(function() {
          // If login is successful, redirect to the users state
          $location.path('/');
        })
        .catch(function(response) {
          // Handle errors here, such as displaying a notification
          // for invalid email and/or password.
          if(response.status == 400) {
            toastr.error('Invalid Email and/or Password');
            //toastr.options.closeDuration = 900;
            vm.username = "";
            vm.password = "";
          }
        });
      }
    });
})();
