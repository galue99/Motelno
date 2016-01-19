(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function($rootScope, EventService, $log, $scope, $moment, $interval){

      var vm = this;
      vm.title = "Events";
      var promise_interval, time, seconds;

      $rootScope.menuUser = true;

      $log.info($rootScope.menuUser);

      $scope.totalPages = 0;
      $scope.currentPage = 1;

      $scope.totalPages = 0;
      $scope.currentPage = 1;

      // Pagination Range

      /* Services for obtein all Events */
      $scope.getPosts = function(pageNumber) {

        if(pageNumber===undefined){
          pageNumber = '1';
        }

        EventService.Event.get({fileName: 'services.json', page: pageNumber}, function (data) {

          vm.events = data.results;
          $scope.totalPages = 10;
          $scope.currentPage = pageNumber;

          $log.info(data);

          var pages = [];

          for (var i = 1; i <= $scope.totalPages; i++) {
            pages.push(i);
          }

          $scope.range = pages;

        });
      }



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
      //$scope.prueba = true;

      /* Form Submit Event */
      vm.submitForm = function (form) {
        vm.submitted = true;
        if (form.$valid) {
          vm.event.is_activate = false;
          EventService.Event.save(vm.event,function(data) {
            vm.result = data.$resolved;
            vm.eventForm = !vm.eventForm;
            if(vm.result === true){
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
              vm.event = {};
              vm.submitted = false;
              vm.eventForm = !vm.eventForm;
            }
            vm.user = {};
            vm.submitted = false;
            vm.eventForm = !vm.eventForm;
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
