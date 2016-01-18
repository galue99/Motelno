/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserListController', function(EventService, $stateParams, $log, $rootScope, $scope){

      var vm = this;
      vm.title = "User List";
      vm.param1 = $stateParams.id;

      $scope.currentPage = 1;
      $scope.pageSize = 10;

      //$scope.totalPages = 0;
      //$scope.currentPage = 1;

      /* Services for obtein all Events */

        EventService.Event.get({fileName: 'services.json', id: vm.param1}, function (data) {
          vm.users = data.members;
        });


    });


})();
