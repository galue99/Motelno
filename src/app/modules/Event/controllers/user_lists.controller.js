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
      vm.list = {};
      vm.listEmail = [];

      $scope.currentPage = 1;
      $scope.pageSize = 10;

      //$scope.totalPages = 0;
      //$scope.currentPage = 1;

      /* Services for obtein all Events */

        EventService.Event.get({id: vm.param1}, function (data) {
          vm.users = data.members;
        });


        vm.change = function(id){
          if (vm.listEmail.indexOf(id) === -1){
            vm.listEmail.push({ids:id});
            _.each(vm.listEmail, function (obj) {
              $log.info(obj);
              if(obj !== {ids:id}){
                $log.info(obj);

              }
            });
          }else{
            var index = vm.listEmail.indexOf(id);
            vm.listEmail.splice(index, 1);
          }

          $log.info(vm.listEmail);
        };


    });


})();
