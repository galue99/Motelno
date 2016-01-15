/**
 * Created by edgar on 15/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('CreateUserController', CreateUserController);

  /** @ngInject */
  function CreateUserController($timeout, toastr, $scope, $log, $http, EventService) {
    /*var postEvents = $http.get('http://192.168.0.100:8001/Event/')
     postEvents.then(function(result) {
     $scope.results = result.data;
     $log.info($scope.results);

     });*/
    $scope.title = 'Users List';
    var result = {descriptions: "Nestor Nestor",
      isActivate: false,
      max_partipants: 300,
      name: "Nestor" };
    //$scope.data = {name:'Prueba',description:'Prueba Prueba Prueba',max_partipants:200,isActivate:false};
    //EventService.save(result);



  }

})();
