/**
 * Created by edgar on 13/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('DetailController', function($scope, $rootScope, $stateParams, Upload, $timeout, EventService, $moment, $interval, $state, toastr, base_url, $log, $window){

      var vm = this;
      vm.labels = ["Users Confirmed", "Users Pending"];
      vm.colors = ['#FF0000', '#008000','#0000FF', '#FFFFFF'];


      vm.param1 = $stateParams.id;
      vm.module = 'Event';
      vm.title = 'Event Details';
      vm.detailForm = false;
      vm.detailDelete = false;
      vm.codeForm = false;
      vm.uploadForm = false;
      vm.code = {};
      vm.listCode = true;
      //vm.copyDetails1 = {};

      vm.hgt = $window.innerHeight - 52;

      vm.getDetailEvent = function() {
        EventService.Event.get({id: vm.param1}, function (data) {
          vm.details = (data);
          vm.data = [data.count_members_activo, data.count_members_no_activo];
          vm.copyDetails = angular.copy(data);
          vm.copyDetails1 = angular.copy(data);
          $scope.status = vm.copyDetails1.is_activate;
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
        vm.listCode = !vm.listCode;

        if(vm.detailForm === true){
          vm.detailForm = !vm.detailForm;
        }
        if(vm.codeForm === true){
          vm.codeForm = !vm.codeForm;
        }

      };


      /* Date Picker */
/*      $scope.today = function() {
        vm.copyDetails.date = new Date();
      };

      $scope.today();*/

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

      vm.toogleCodeForm = function () {
        vm.codeForm = !vm.codeForm;

        if(vm.uploadForm === true){
          vm.uploadForm = !vm.uploadForm;
        }

        if(vm.detailForm === true){
          vm.detailForm = !vm.detailForm;
        }

      };

      vm.toogleUpload = function () {
        vm.uploadForm = !vm.uploadForm;
        vm.listCode = !vm.listCode;

        if(vm.detailForm === true){
          vm.detailForm = !vm.detailForm;
        }
        if(vm.codeForm === true){
          vm.codeForm = !vm.codeForm;
        }

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


    /* Download Excell */
      vm.downloadList = function() {
        location.href = base_url +'/Event/'+vm.param1+'/export_data';
      };
    /* End Download */

      /* Switch Button */
       $scope.changeStatus = function(){
         $scope.status = !$scope.status;
         vm.copyDetails1.is_activate = $scope.status;
         delete vm.copyDetails1['image_principal'];
         delete vm.copyDetails1['image_information'];

         EventService.Event.update({id:vm.param1},vm.copyDetails1,function(data) {
           vm.details = (data);
           vm.result = data.$resolved;
           toastr.success('The update of the event was a success');
         });
      };
      /* End Button*/


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
