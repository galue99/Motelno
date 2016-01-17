/**
 * Created by edgar on 17/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('LoginController', function($rootScope, $scope){

      $rootScope.$emit('body:class:add', 'hold-transition login-page');
      $rootScope.menuUser = false;
      var vm = this;


    });
})();
