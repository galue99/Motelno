/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LogoutCtrl', function($state, $auth, toastr, $rootScope){
      console.log($auth.isAuthenticated());
      $rootScope.$emit('body:class:remove', 'hold-transition skin-blue fixed sidebar-mini login-page');
      $rootScope.$emit('body:class:add', 'hold-transition login-page');
      $rootScope.menuUser = false;
      if (!$auth.isAuthenticated()) { return; }

      $auth.logout()
        .then(function() {
          toastr.info('You have been logged out');
          $state.go('main');
        });

    });
})();
