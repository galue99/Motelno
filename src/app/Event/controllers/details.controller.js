/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $routeParams, $log, EventService){

      var vm = this;
      $scope.labels = ["Users Confirmed", "Users Pendent"];
      $scope.data = [300, 500];

      vm.param1 = $routeParams.id;

      vm.title = 'Details';

      EventService.Event.get({id:vm.param1},function(data) {
        vm.details = (data);
        $log.info(data);
      });

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

    });
})();
