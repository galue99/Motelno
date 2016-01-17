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
      var promise_interval, time, seconds, index;


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


      vm.model = {
        selected: {}
      };

      // gets the template to ng-include for a table row / item
      $scope.getTemplate = function (contact) {
        if (contact.id === vm.model.selected.id) return 'edit';
        else return 'display';
      };

      vm.editContact = function (contact) {
        vm.model.selected = angular.copy(contact);
      };

      vm.saveContact = function (idx) {
        vm.participants[idx] = angular.copy(vm.model.selected);
        EventService.Participant.update({id: vm.participants[idx].id}, vm.participants[idx], function(data) {
          vm.details = (data);
          vm.result = data.$resolved;
          time = $moment({ second: 0 });
          seconds = 0;
          promise_interval = $interval(function () {
            seconds += 1;
            time.second(seconds);
            if (seconds === 60) { seconds = 0; }
            if(time.format('ss') === '04'){
              vm.result = false;
              vm.stop();
            }
          }, 1000);
        });
        vm.reset();
      };

      vm.deleteUser = function(contact){

        EventService.Participant.delete({id:contact.id},function(data) {
          vm.result = data.$resolved;
          if(vm.result === true){

            _.each(vm.participants, function (obj) {
              index = _.findIndex(vm.participants, {id: contact.id, url: contact.url});
              if (index !== -1) {
                vm.participants.splice(index, 1);
              }
            });

            time = $moment({ second: 0 });
            seconds = 0;
            promise_interval = $interval(function () {
              seconds += 1;
              time.second(seconds);
              if (seconds === 60) { seconds = 0; }
              $log.info(time.format('ss'));
              if(time.format('ss') === '02'){
                vm.result = false;
                vm.stop();
              }
            }, 1000);

          }

        });
      };

      vm.reset = function () {
        vm.model.selected = {};
      };

    });

})();
