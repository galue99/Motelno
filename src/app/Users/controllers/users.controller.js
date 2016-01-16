/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserController', function(EventService, $log, $scope, $moment, $interval){

      var vm = this;
      vm.title = "Users"
      vm.userForm = false;
      var promise_interval, time, seconds;
      $scope.currentPage = 1;
      $scope.pageSize = 5;

      /* Services for obtein all Events */

      EventService.Participant.get({fileName: 'services.json'},function(data) {
        vm.participants = data.results;
        $log.info(data);
      });

      vm.deleteUser = function(id){
        $log.info(id);
      }

      vm.toogleUserForm = function () {
        vm.userForm = !vm.userForm;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      vm.submitForm = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          EventService.Participant.save(vm.user,function(data) {
            $log.info(data);
            vm.result = data.$resolved;

            if(vm.result === true){
              time = $moment({ second: 0 });
              seconds = 0;
              promise_interval = $interval(function () {
                seconds += 1;
                time.second(seconds);
                if (seconds === 60) { seconds = 0; }
                $log.info(time.format('ss'));
                if(time.format('ss') === '04'){
                  vm.result = false;
                  vm.stop();
                }
              }, 1000);
            }else{
              vm.results = true;
              time = $moment({ second: 0 });
              seconds = 0;
              promise_interval = $interval(function () {
                seconds += 1;
                time.second(seconds);
                if (seconds === 60) { seconds = 0; }
                $log.info(time.format('ss'));
                if(time.format('ss') === '04'){
                  vm.result = false;
                  vm.stop();
                }
              }, 1000);
            }
            vm.user = {};
            $scope.submitted = false;
            vm.userForm = !vm.userForm;
          });
        }
      };

      vm.stop = function () {
        $interval.cancel(promise_interval);
      };

    });

})();
