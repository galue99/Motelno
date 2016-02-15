/**
 * Created by edgar on 04/02/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('FileController', function($scope, Upload, $timeout , base_url, toastr){

      var vm = this;
      vm.title = "Admin Images";

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
