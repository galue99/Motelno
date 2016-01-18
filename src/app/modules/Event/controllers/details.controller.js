/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $rootScope, $stateParams, $log, EventService, $moment, $interval, $state){

      var vm = this;
      vm.labels = ["Users Confirmed", "Users Pendent"];
      vm.data = [300, 500];

      vm.param1 = $stateParams.id;
      vm.module = 'Event';
      vm.title = 'Details';
      vm.detailForm = false;
      vm.detailDelete = false;
      vm.codeForm = false;
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

      vm.toogleCodeForm = function () {
        vm.codeForm = !vm.codeForm;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      /**/

      vm.cancelDelete = function(){
        vm.detailDelete = !vm.detailDelete;
        if(vm.detailDelete === true){
          vm.detailDelete = !vm.detailDelete;
        }
      };

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
                $state.go('main');
              }
            }, 1000);

          }

        });

      };

      vm.submitForm = function (form) {
        vm.submitted = true;
        if (form.$valid) {
          EventService.Event.update({id:vm.param1},vm.details,function(data) {
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
            vm.submitted = false;
            vm.detailForm = !vm.detailForm;
          }, function(error){
              $log.info(error);
              vm.result = false;
          });
        }
      };

      vm.prueba = function (){
        $log.info('sd');
      };

      vm.stop = function () {
        $interval.cancel(promise_interval);
      };

      vm.submitFormCode = function(form){
        vm.submitted = true;
        if(form.$valid){
          $log.info(vm.create);
        }
      }

      vm.randString = function(){
        var s = "";
        while(s.length<20&&20>0){
          var r = Math.random();
          s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
        }
        vm.create = {};
        vm.create.code = s;
      };

    });
})();
