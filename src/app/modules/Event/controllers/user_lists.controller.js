/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserListController', function(EventService, $stateParams, $log){

      var vm = this;
      vm.title = "User List";
      vm.param1 = $stateParams.id;

      /* Services for obtein all Events */

      EventService.Participant.get({id: vm.param1},function(data) {
        vm.events = data.results;
        $log.info(data);
      });

    });


})();
