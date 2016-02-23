/**
 * Created by edgar on 04/02/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('FileController', function($scope, Upload, $timeout, base_url, toastr, $window, EventService, $log){

      var vm = this;
      vm.title = "Admin Images";

      vm.hgt = $window.innerHeight - 55;

      $scope.totalPages  = 0;
      $scope.currentPage = 1;

      /*EventService.Location.get(function (data) {
        vm.location = data.results;
        $log.info(vm.location);
      });
*/

      /* Start Pagination Range  */
      /* Services for obtein all Events */
      $scope.getPosts = function(pageNumber) {

        if(pageNumber===undefined){
          pageNumber = '1';
        }

        $log.info('post');

        EventService.Location.get({page: pageNumber}, function (data) {

          vm.location = data.results;
          $log.info(vm.location);

          if( (data.count/10) % 1 != 0){
            $scope.totalPages = Math.floor(data.count/10) + 1;
          }else{
            $scope.totalPages = Math.floor(data.count/10);
          }

          $scope.currentPage = pageNumber;

          var pages = [];

          for (var i = 1; i <= $scope.totalPages; i++) {
            pages.push(i);
          }

          $scope.range = pages;

        });
      };
      /* End Pagination */

      $scope.uploadPic = function(file, file2, file3) {
        file.upload = Upload.upload({
          url: base_url + 'Location',
          data: {image_information_english: file, image_tonight_english: file2, image_jackdaniels_english: file3, name: 'Admin'}
        });

        file.upload.then(function (response) {
          $timeout(function () {
            file.result = response.data;
            if(file.result){
              toastr.success('Upload Images with Exits');
              vm.file   = {};
              vm.picFile2  = {};
              vm.picFile3  = {};
            }
          });
        }, function (response) {
          if (response.status > 0)
            $scope.errorMsg = response.status + ': ' + response.data;
        }, function (evt) {
          // Math.min is to fix IE which reports 200% sometimes
          file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      }
    });
})();
