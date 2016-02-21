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
      vm.hgt = $window.innerHeight - 52;

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
            vm.listEmail.push(id);
            _.each(vm.listEmail, function (obj) {
              $log.info(obj);
              if(obj !== id){
                $log.info(obj);
              }
            });
          }else{
            var index = vm.listEmail.indexOf(id);
            vm.listEmail.splice(index, 1);
          }
        };

        vm.sendEmail = function(){
          var obj = "";

           for(var i=0; i<vm.listEmail.length; i++){
             if(i > 0){
               obj = obj.concat('&user_ids=' + vm.listEmail[i]);
             }else {
               obj = obj.concat('user_ids=' + vm.listEmail[i]);
             }
          };

          $http({
            method: 'GET',
            url: 'http://motelo7qab.herokuapp.com/Event/2/send_mass_email?'+obj
          }).then(function successCallback(response) {
            // this callback will be called asynchronously
            // when the response is available
          }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
          });

        };


    });


})();
