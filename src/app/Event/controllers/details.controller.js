/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', DetailController);

  /** @ngInject */
  function DetailController($timeout, toastr, $scope, $log, $http, EventService, $routeParams) {

    $scope.labels = ["Users Confirmed", "Users Pendent"];
    $scope.data = [300, 500];

    var param1 = $routeParams.id;

    console.log(param1);
    $scope.title = 'Details';

  }

})();
