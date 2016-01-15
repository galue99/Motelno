(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function(EventService, $log){

      var vm = this;
      vm.title = "Events";

      /* Services for obtein all Events */

      EventService.Event.get({fileName: 'services.json'},function(data) {
        vm.events = data.results;
      });

      /*EventService.get(function(data) {
        $log.info(data);
      });*/

    })
})();
