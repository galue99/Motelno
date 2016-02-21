(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function($rootScope, EventService, $log, $scope, $moment, $interval, toastr, $window){

      var vm = this;
      vm.title = "Events";
      vm.tab = 1;
      vm.event = {};

      vm.hgt = $window.innerHeight - 52;

      $scope.totalPages = 0;
      $scope.currentPage = 1;

      vm.selectTab = function (tab) {
        vm.tab = tab;
      };

      /* Date Picker */
      $scope.today = function() {
        vm.event.date = new Date();
      };

      $scope.today();

      $scope.clear = function() {
        vm.event.date = null;
      };

      // Disable weekend selection
      $scope.disabled = function(date, mode) {
        return mode === 'day' && (date.getDay() === -1 || date.getDay() === 7);
      };

      $scope.toggleMin = function() {
        $scope.minDate = $scope.minDate ? null : new Date();
      };

      $scope.toggleMin();
      $scope.maxDate = new Date(2020, 5, 22);

      $scope.open1 = function() {
        $scope.popup1.opened = true;
      };

      $scope.open2 = function() {
        $scope.popup2.opened = true;
      };

      $scope.setDate = function(year, month, day) {
        $scope.dt = new Date(year, month, day);
      };

      $scope.dateOptions = {
        formatYear: 'yy',
        startingDay: 1
      };

      $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
      $scope.format = $scope.formats[0];
      $scope.altInputFormats = ['M!/d!/yyyy'];

      $scope.popup1 = {
        opened: false
      };

      $scope.popup2 = {
        opened: false
      };

      var tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      var afterTomorrow = new Date();
      afterTomorrow.setDate(tomorrow.getDate() + 1);
      $scope.events =
        [
          {
            date: tomorrow,
            status: 'full'
          },
          {
            date: afterTomorrow,
            status: 'partially'
          }
        ];

      $scope.getDayClass = function(date, mode) {
        if (mode === 'day') {
          var dayToCheck = new Date(date).setHours(0,0,0,0);

          for (var i = 0; i < $scope.events.length; i++) {
            var currentDay = new Date($scope.events[i].date).setHours(0,0,0,0);

            if (dayToCheck === currentDay) {
              return $scope.events[i].status;
            }
          }
        }

        return '';
      };

      /* End Date*/


      EventService.Event.get({is_activate: 'True'}, function (data) {
        vm.events_active = data.results;
      });


      /* Start Pagination Range  */
      /* Services for obtein all Events */
      $scope.getPosts = function(pageNumber) {

        if(pageNumber===undefined){
          pageNumber = '1';
        }

        EventService.Event.get({page: pageNumber}, function (data) {

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

      vm.getEvent = function(){
        EventService.Event.get({}, function (data) {
          vm.events = data.results;
        });

      }
      vm.getEvent();

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
              vm.getEvent();
            }

          },function(error){
            toastr.error(error);
          });
        }
      };

      /* Function Cancel form Event */
      vm.cancel = function(){
        vm.event = {};
        vm.submitted = false;
        vm.eventForm = !vm.eventForm;
      };

    });

})();
