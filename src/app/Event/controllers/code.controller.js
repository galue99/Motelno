/**
 * Created by edgar on 15/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('CodeController', function($routeParams){

      var vm = this;

      vm.param1 = $routeParams.id;

      vm.title = 'Generate Code';


    });

})();
