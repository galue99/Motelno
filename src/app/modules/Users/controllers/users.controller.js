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

      vm.getUsers();

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
            toastr.success('The user was successfully saved');
            vm.user = {};
            vm.submitted = false;
            vm.userForm  = false;
            vm.getUsers();
          }, function (error) {
            toastr.error('Error with Save User');
            vm.resultError = true;
          });
        }
      };

      vm.model = {
        selected: {}
      };

      // gets the template to ng-include for a table row / item
      vm.getTemplate = function (contact) {
        if (contact.id === vm.model.selected.id) {return 'edit';}
        else {return 'display';}
      };

      vm.editContact = function (contact) {
        vm.model.selected = angular.copy(contact);
      };

      vm.saveContact = function (idx) {
        vm.participants[idx] = angular.copy(vm.model.selected);
        EventService.Participant.update({id: vm.participants[idx].id}, vm.participants[idx], function(data) {
          vm.details = (data);
          vm.result = data.$resolved;
          toastr.success('The User Update with Exits');
        });
        vm.reset();
      };

      vm.deleteUser = function(contact){

        EventService.Participant.delete({id:contact.id},function(data) {
          vm.result = data.$resolved;
          if(vm.result === true){

            _.each(vm.participants, function () {
              var index = _.findIndex(vm.participants, {id: contact.id, url: contact.url});
              if (index !== -1) {
                vm.participants.splice(index, 1);
              }
            });
            toastr.success('The User was Deleted with Success');
            vm.result = false;
            vm.getUsers();
          }
        });
      };

      vm.reset = function () {
        vm.model.selected = {};
      };

    });

})();
