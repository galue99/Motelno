/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LogoutCtrl', function($location, $auth, toastr){
      console.log($auth.isAuthenticated());
      if (!$auth.isAuthenticated()) { return; }

      $auth.logout()
        .then(function() {
          toastr.info('You have been logged out');
          //$location.path('/');
        });

    });
})();
