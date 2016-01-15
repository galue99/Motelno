/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('UserController', function(EventService, $log){

      var vm = this;
      vm.title = "Users"
      vm.userForm = false;

      /* Services for obtein all Events */

      EventService.Participant.get({fileName: 'services.json'},function(data) {
        vm.participants = data.results;
      });

      vm.deleteUser = function(id){
        $log.info(id);
      }

      vm.toogleUserForm = function () {
        vm.userForm = !vm.userForm;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

    });

})();
