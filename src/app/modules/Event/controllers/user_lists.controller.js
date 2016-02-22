/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserListController', function(EventService, $stateParams, $log, $rootScope, $scope, $http, $window){

      var vm = this;
      vm.title = "User List";
      vm.breadcumbs = "Events > Details > User List";

      vm.param1 = $stateParams.id;
      vm.list = {};
      vm.listEmail = [];
      vm.user = {};
      vm.hgt = $window.innerHeight - 52;

      $scope.currentPage = 1;
      $scope.pageSize = 10;

      //$scope.totalPages = 0;
      //$scope.currentPage = 1;

      /* Services for obtein all Events */

        EventService.Membership.get({id: vm.param1}, function (data) {
          vm.members = data.results;
          $scope.Items = vm.members;
          vm.user.Selected = vm.members;
          vm.codes = data.results[0].event.Codes;
        });

      /* Check All */

      $scope.checkAll = function () {
        if($scope.selectedAll) {
          $scope.selectedAll = true;
        }else{
          $scope.selectedAll = false;
        }
        angular.forEach($scope.Items, function (item) {
          item.Selected = $scope.selectedAll;
        });

        for(var i=0; i<vm.members.length; i++){
          vm.change(vm.members[i].participant.id);
        }
      };

      $scope.uncheckAll = function () {
        if ($scope.selectedAll) {
          $scope.selectedAll = true;
        } else {
          $scope.selectedAll = false;
        }
        angular.forEach($scope.Items, function (item) {
          item.Selected = !$scope.selectedAll;
        });

        for(var i=0; i<vm.members.length; i++){
          vm.change(vm.members[i].participant.id);
        }
      };
      /* end Check All*/


      vm.change = function(id){
          if (vm.listEmail.indexOf(id) === -1){
            vm.listEmail.push(id);
            _.each(vm.listEmail, function (obj) {
              $log.info(vm.listEmail);
            });
          }else{
            var index = vm.listEmail.indexOf(id);
            vm.listEmail.splice(index, 1);
          }
        };

        vm.sendEmail = function(){
          var obj = "";

          $http({
            method: 'POST',
            url: 'http://motelo7qab.herokuapp.com/CodeEvent/'+vm.param1+'/send_mass_email',
            data: {partipant_ids: vm.listEmail},
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

        /*   for(var i=0; i<vm.listEmail.length; i++){
             if(i > 0){
               obj = obj.concat('&user_ids=' + vm.listEmail[i]);
             }else {
               obj = obj.concat('user_ids=' + vm.listEmail[i]);
             }
          }*/

      /*    $http({
            method: 'GET',
            url: 'http://motelo7qab.herokuapp.com/Event/2/send_mass_email?'+obj
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });*/

        };


    });


})();
