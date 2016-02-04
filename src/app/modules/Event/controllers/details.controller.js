/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $rootScope, $stateParams, $log, EventService, $moment, $interval, $state, toastr){

      var vm = this;
      vm.labels = ["Users Confirmed", "Users Pending"];
      vm.colors = ['#FF0000', '#008000','#0000FF', '#FFFFFF'];
      vm.data = [300, 500];

      vm.param1 = $stateParams.id;
      vm.module = 'Event';
      vm.title = 'Details';
      vm.detailForm = false;
      vm.detailDelete = false;
      vm.codeForm = false;
      vm.code = {};

      vm.getDetailEvent = function() {
        EventService.Event.get({id: vm.param1}, function (data) {
          vm.details = (data);
          vm.copyDetails = angular.copy(data);
        });
      };

      vm.getDetailEvent();

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
        if(vm.codeForm === true){
          vm.codeForm = !vm.codeForm;
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

        if(vm.detailDelete === true){
          vm.detailDelete = !vm.detailDelete;
        }
      };

      vm.cancelEdit = function(){
        vm.copyDetails =  angular.copy(vm.details);
        if(vm.detailForm === true){
          vm.detailForm = !vm.detailForm;
        }
      };

      vm.submitDeleteForm = function(){
        EventService.Event.delete({id:vm.param1},function(data) {
          vm.result = data.$resolved;
          if(vm.result === true){
            vm.detailDelete = !vm.detailDelete;
            toastr.success('The Event was Deleted with Success');
            $state.go('main');
          }

        });

      };

      vm.submitForm = function (form) {
        vm.submitted = true;
        if (form.$valid) {
          EventService.Event.update({id:vm.param1},vm.copyDetails,function(data) {
            vm.details = (data);
            vm.result = data.$resolved;
            toastr.success('The update of the event was a success');
            vm.submitted = false;
            vm.detailForm = !vm.detailForm;
          });
        }
      };

      vm.submitFormCode = function(form){
        vm.submitted = true;
        if(form.$valid){
          vm.code.description = vm.create.description;
          vm.code.code = vm.create.code;
          vm.code.event = vm.details.url;

          EventService.CodeEvent.save(vm.code,function(data) {
            vm.result = data.$resolved;
            if(vm.result === true){
              vm.getDetailEvent();
              toastr.success('The Code was successfully saved');
            }
          });
        }
      };

      vm.randString = function(){
        var s = "";
        while(s.length<20&&20>0){
          var r = Math.random();
          s+= (r<0.1?Math.floor(r*100):String.fromCharCode(Math.floor(r*26) + (r>0.5?97:65)));
        }
        vm.create = {};
        vm.create.code = s;
      };


      /* Switch Buttom */

      vm.isSelected = 'No';
      vm.onText = 'Y';
      vm.offText = 'N';
      vm.isActive = true;
      vm.size = 'normal';
      vm.animate = true;
      vm.radioOff = true;
      vm.handleWidth = "auto";
      vm.labelWidth = "auto";
      vm.inverse = true;

      $scope.$watch('isSelected', function() {
        $log.info(vm.isSelected);
      });

      vm.toggle = function() {
        vm.isSelected = vm.isSelected === 'Yes' ? 'No' : 'Yes';
      };

      vm.setUndefined = function() {
        vm.isSelected = undefined;
      };

      vm.toggleActivation = function() {
        vm.isActive = !vm.isActive;
      };

    });
})();
