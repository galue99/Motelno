/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $rootScope, $stateParams, Upload, $timeout, EventService, $moment, $interval, $state, toastr, base_url, $log){

      var vm = this;
      vm.labels = ["Users Confirmed", "Users Pending"];
      vm.colors = ['#FF0000', '#008000','#0000FF', '#FFFFFF'];


      vm.param1 = $stateParams.id;
      vm.module = 'Event';
      vm.title = 'Details';
      vm.detailForm = false;
      vm.detailDelete = false;
      vm.codeForm = false;
      vm.uploadForm = false;
      vm.code = {};

      vm.getDetailEvent = function() {
        EventService.Event.get({id: vm.param1}, function (data) {
          vm.details = (data);
          vm.data = [data.count_members_activo, data.count_members_no_activo];
          vm.copyDetails = angular.copy(data);
        });
      };

     // vm.details.details.count_members_activo
      //vm.details.details.count_members_no_activo

      //$log.info(vm.details.details.count_members_no_activo);

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

      vm.toogleUpload = function () {
        vm.uploadForm = !vm.uploadForm;
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

      vm.downloadList = function() {
        location.href = base_url +'/Event/'+vm.param1+'/export_data';
      };


      /* Upload Image */
      $scope.uploadPic = function(file, file2) {
        file.upload = Upload.upload({
          url: base_url + 'Event/' + vm.param1,
          data: {is_activate: vm.details.is_activate, date: vm.details.date, location:vm.details.location, description:vm.details.description, name:vm.details.name, max_participant: vm.details.max_participant, image_information: file, image_principal: file2},
          method: 'PUT'
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            if(file.result){
              toastr.success('Upload Images with Exits');
              vm.file   = {};
              vm.picFile2  = {};
            }
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      };

      /*End Upload */

    });
})();
