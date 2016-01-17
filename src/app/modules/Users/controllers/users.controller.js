/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserController', function(EventService, $log, $rootScope,$scope, $moment, $interval){

      var vm = this;
      vm.title = "Users"
      vm.userForm = false;
      var promise_interval, time, seconds;

      /* Services for obtein all Events */
      EventService.Participant.get({fileName: 'services.json'},function(data) {
        vm.participants = data.results;
        $log.info(data);
      });

      $rootScope.$emit('body:class:remove', 'hold-transition login-page');
      $rootScope.$emit('body:class:add', 'hold-transition skin-blue fixed sidebar-mini');
      if($rootScope.menuUser === false || $rootScope.menuUser === undefined ){
        $rootScope.menuUser = true;
      }

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

            vm.user = {};
            $scope.submitted = false;
            vm.userForm = !vm.userForm;
          });
        }
      };

      vm.stop = function () {
        $interval.cancel(promise_interval);
      };


      $scope.model = {
        contacts: [{
          id: 1,
          name: "Ben",
          age: 28
        }, {
          id: 2,
          name: "Sally",
          age: 24
        }, {
          id: 3,
          name: "John",
          age: 32
        }, {
          id: 4,
          name: "Jane",
          age: 40
        }],
        selected: {}
      };

      // gets the template to ng-include for a table row / item
      $scope.getTemplate = function (contact) {
        if (contact.id === $scope.model.selected.id) return 'edit';
        else return 'display';
      };

      $scope.editContact = function (contact) {
        $scope.model.selected = angular.copy(contact);
      };

      $scope.saveContact = function (idx) {
        console.log("Saving contact");
        $scope.model.contacts[idx] = angular.copy($scope.model.selected);
        $scope.reset();
      };

      $scope.reset = function () {
        $scope.model.selected = {};
      };

    });

})();
