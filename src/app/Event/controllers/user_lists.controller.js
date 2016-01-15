/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserListController', function(EventService, $routeParams){

      var vm = this;
      vm.title = "User List";
      vm.param1 = $routeParams.id;

      /* Services for obtein all Events */

      EventService.UserEvents.get({id: vm.param1},function(data) {
        vm.events = data.results;
      });

    });


})();
