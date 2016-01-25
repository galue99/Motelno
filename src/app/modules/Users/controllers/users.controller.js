/**
 * Created by edgar on 14/01/16.
 */
/* angular */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserController', function(EventService, $log, $rootScope, $scope, $moment, $interval, toastr){

      var vm = this;
      vm.title = "Users";
      vm.userForm = false;

      $scope.totalPages  = 0;
      $scope.currentPage = 1;

      // Pagination Range

      /* Services for obtein all Users */
      $scope.getPosts = function(pageNumber) {

        if(pageNumber == undefined){
          pageNumber = '1';
        }

        EventService.Participant.get({fileName: 'services.json', page: pageNumber}, function (data) {

          vm.participants = data.results;
          $scope.totalPages = Math.floor(data.count/10);
          $scope.currentPage = pageNumber;

          $log.info(data);

          var pages = [];

          for (var i = 1; i <= $scope.totalPages; i++) {
            pages.push(i);
          }

          $scope.range = pages;

        });
      };

      vm.getUsers = function(){
        EventService.Participant.get({fileName: 'services.json'}, function (data) {
          vm.participants = data.results;
        });
      };

      vm.toogleUserForm = function () {
        vm.userForm = !vm.userForm;
        vm.user = {};
        vm.submitted = false;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      vm.submitForm = function (form) {
        vm.submitted = true;
        if (form.$valid) {
          EventService.Participant.save(vm.user, function (data) {
            vm.result = data.$resolved;
            toastr.success('The User Save with Exits');
            vm.user = {};
            vm.submitted = false;
            vm.userForm  = false;
          }, function (error) {
            toastr.error('Error with Save User');
            vm.resultError = true;
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
      vm.getTemplate = function (contact) {
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

            _.each(vm.participants, function () {
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
                vm.getUsers();
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
