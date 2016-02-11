(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function($rootScope, EventService, $log, $scope, $moment, $interval, toastr, $uibModal){

      var vm = this;
      vm.title = "Events";

      $scope.totalPages = 0;
      $scope.currentPage = 1;


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


      $scope.items = ['item1', 'item2', 'item3'];

      $scope.animationsEnabled = true;

      $scope.open = function (size) {

        var modalInstance = $uibModal.open({
          animation: $scope.animationsEnabled,
          templateUrl: 'myModalContent.html',
          controller: 'ModalInstanceCtrl',
          size: size,
          resolve: {
            items: function () {
              return vm.events_active;
            }
          }
        });

        modalInstance.result.then(function (selectedItem) {
          $scope.selected = selectedItem;
        }, function () {
          $log.info('Modal dismissed at: ' + new Date());
        });
      };

      $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
      };


    })

  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {

    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };

    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  });
})();
