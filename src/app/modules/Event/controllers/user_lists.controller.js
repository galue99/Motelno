/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserListController', function(EventService, $stateParams, $log, $rootScope, $scope, $http, $window, base_url, toastr){

      var vm = this;
      vm.title = "User List";
      vm.breadcumbs = "Events > Details > User List";

      vm.param1 = $stateParams.id;
      vm.list = {};
      vm.listEmail = [];
      vm.user = {};
      vm.myCode = "";
      vm.hgt = $window.innerHeight - 52;
      vm.isBusy = false;

      $scope.currentPage = 1;
      $scope.pageSize = 10;

      //$scope.totalPages = 0;
      //$scope.currentPage = 1;

      /* Services for obtein all Events */

        EventService.Membership.get({id: vm.param1}, function (data) {
          vm.members = data.results;
          $scope.Items = vm.members;
          vm.user.Selected = vm.members;
        });

      EventService.Event.get({id: vm.param1}, function (data) {
        vm.codes = data.Codes;
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
            });
          }else{
            var index = vm.listEmail.indexOf(id);
            vm.listEmail.splice(index, 1);
          }
        };

        vm.sendEmail = function(myCode){
          var obj = "";
          vm.codeSendEmail = myCode.id;
          vm.isBusy = true;

          if(vm.listEmail.length == 0){
            vm.isBusy = false;
            toastr.error('There was an error be sure to select a user from the list');
            return;
          }

           $http({
            method: 'POST',
            url: base_url+'CodeEvent/'+vm.codeSendEmail+'/send_mass_email',
            data: {
              "description": "",
              "code": vm.codeSendEmail,
              "event": null,
              "participant_ids":vm.listEmail
            }
          }).then(function successCallback(response) {
            toastr.success('The emails were sent successfully');
             vm.isBusy = false;
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            toastr.error('An error occured please intented again');
             vm.isBusy = false;
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });
        };

        /* Download Excell */
        vm.downloadList = function() {
          location.href = base_url +'/Event/'+vm.param1+'/export_data';
        };
        /* End Download */


    });


})();
