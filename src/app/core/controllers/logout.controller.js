/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LogoutController', function($state, $auth, toastr){

      if (!$auth.isAuthenticated()) { return; }

      $auth.logout()
        .then(function() {
          toastr.info('You have been logged out');
          $state.go('main');
        });

    });
})();
