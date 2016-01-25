(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function($rootScope, EventService, $log, $scope, $moment, $interval, toastr){

      var vm = this;
      vm.title = "Events";
      var promise_interval, time, seconds;

      $scope.totalPages = 0;
      $scope.currentPage = 1;

      /* Start Pagination Range  */
      /* Services for obtein all Events */
      $scope.getPosts = function(pageNumber) {

        if(pageNumber===undefined){
          pageNumber = '1';
        }

        EventService.Event.get({fileName: 'services.json', page: pageNumber}, function (data) {

          vm.events = data.results;

          $scope.totalPages = Math.floor(data.count/10);
          $scope.currentPage = pageNumber;

          var pages = [];

          for (var i = 1; i <= $scope.totalPages; i++) {
            pages.push(i);
          }

          $scope.range = pages;

        });
      };
      /* End Pagination */

      EventService.Event.get({is_activate: true}, function (data) {
        $log.info(data);
      });

      /*EventService.Event.get({fileName: 'services.json', limit: 5,  offset: 50},function(data) {
       vm.events = data.results;
       });*/

      vm.toogleEventForm = function () {
        vm.eventForm = !vm.eventForm;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      /* Form Submit Event */
      vm.submitForm = function (form) {
        vm.submitted = true;
        if (form.$valid) {
          vm.event.is_activate = false;
          EventService.Event.save(vm.event,function(data) {
            vm.result = data.$resolved;
            vm.eventForm = !vm.eventForm;
            if(vm.result){
              toastr.success('The Event Save with Exits');
              vm.event = {};
              vm.submitted = false;
              vm.eventForm = false;
            }

          },function(error){
            toastr.error('Error with Save Event');
          });
        }
      };

      /* Function Cancel form Event */
      vm.cancel = function(){
        vm.event = {};
        vm.submitted = false;
        vm.eventForm = !vm.eventForm;
      };

      /* Function Stop Time */
      vm.stop = function () {
        $interval.cancel(promise_interval);
      };

    });
})();
