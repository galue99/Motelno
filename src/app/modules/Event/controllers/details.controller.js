/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $rootScope, $routeParams, $log, EventService, $moment, $interval, $window){

      var vm = this;
      $scope.labels = ["Users Confirmed", "Users Pendent"];
      $scope.data = [300, 500];

      $rootScope.$emit('body:class:remove', 'hold-transition login-page');
      $rootScope.$emit('body:class:add', 'hold-transition skin-blue fixed sidebar-mini');
      if($rootScope.menuUser === false || $rootScope.menuUser === undefined ){
        $rootScope.menuUser = true;
      }


      vm.param1 = $routeParams.id;
      vm.module = 'Event';
      vm.title = 'Details';
      vm.detailForm = false;
      vm.detailDelete = false;
      var promise_interval, time, seconds;

      EventService.Event.get({id:vm.param1},function(data) {
        vm.details = (data);
      });

      vm.toogleDetailForm = function () {
        vm.detailForm = !vm.detailForm;

        if(vm.detailDelete === true){
          vm.detailDelete = !vm.detailDelete;
        }
      };
      vm.toogleDeleteForm = function () {
        vm.detailDelete = !vm.detailDelete;

        if(vm.detailForm === true){
          vm.detailForm = !vm.detailForm;
        }

      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      /**/

      $scope.cancelDelete = function(){
        $log.info('asdasd');
      }

      vm.submitDeleteForm = function(){
        EventService.Event.delete({id:vm.param1},function(data) {
          vm.result = data.$resolved;
          if(vm.result === true){
            vm.detailDelete = !vm.detailDelete;
            time = $moment({ second: 0 });
            seconds = 0;
            promise_interval = $interval(function () {
              seconds += 1;
              time.second(seconds);
              if (seconds === 60) { seconds = 0; }
              $log.info(time.format('ss'));
              if(time.format('ss') === '02'){
                vm.stop();
                $window.location.href = '/';
              }
            }, 1000);

          }

        });

      }

      vm.submitForm = function (form) {
        $scope.submitted = true;
        if (form.$valid) {
          EventService.Event.update({id:vm.details.id},vm.details,function(data) {
            vm.details = (data);
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
            $scope.submitted = false;
            vm.detailForm = !vm.detailForm;
          });
        }
      };

      vm.prueba = function (){
        $log.info('sd');
      }

      vm.stop = function () {
        $interval.cancel(promise_interval);
      };

    });
})();
