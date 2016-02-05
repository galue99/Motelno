/**
 * Created by edgar on 04/02/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('FileController', function($scope, Upload, $timeout){

      var vm = this;

      $scope.uploadFiles = function(file, errFiles) {
        $scope.f = file;
        $scope.errFile = errFiles && errFiles[0];
        if (file) {
          file.upload = Upload.upload({
            url: 'http://localhost:8080/motel-upload/upload.php',
            method: 'POST',
            file: file,
            headers: {'Content-Type': undefined},
            sendFieldsAs: 'form',
            fields: {
              contact: [
                { name: 'John', email: 'john@example.org' },
                { name: 'Linda', email: 'linda@example.org' }
              ]
            }
          });

          file.upload.then(function (response) {
            $timeout(function () {
              file.result = response.data;
            });
          }, function (response) {
            if (response.status > 0)
              $scope.errorMsg = response.status + ': ' + response.data;
          }, function (evt) {
            file.progress = Math.min(100, parseInt(100.0 *
              evt.loaded / evt.total));
          });
        }
      };

    });
})();
