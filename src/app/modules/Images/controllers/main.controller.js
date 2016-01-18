/**
 * Created by edgar on 18/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('ImageController', function(){

      var vm = this;
      vm.title = "Images Admin";

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

    });
})();
