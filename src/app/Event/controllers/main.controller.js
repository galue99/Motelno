(function() {
  'use strict';

  angular
    .module('motelNo')
    .controller('MainController', function(EventService, $log, $scope, $moment, $interval){

      var vm = this;
      vm.title = "Events";
      var promise_interval, time, seconds;

      /* Services for obtein all Events */

      EventService.Event.get({fileName: 'services.json', limit: 5,  offset: 50},function(data) {
        vm.events = data.results;
        $log.info(data);
      });


      /*EventService.get(function(data) {
        $log.info(data);
      });*/

      vm.toogleEventForm = function () {
        vm.eventForm = !vm.eventForm;
      };

      vm.showDate = function () {
        vm.date = 0;
        vm.date = Date.now();
        return vm.date;
      };

      vm.submitForm = function (form) {
        $log.info(form);
        $scope.submitted = true;

        if (form.$valid) {
          vm.event.is_activate = false;
          $log.info(vm.event);
          EventService.Event.save(vm.event,function(data) {
            $log.info(data);
            vm.result = data.$resolved;
            $log.info(data);
           if(vm.result === true){
              time = $moment({ second: 0 });
              seconds = 0;
              promise_interval = $interval(function () {
                seconds += 1;
                time.second(seconds);
                if (seconds === 60) { seconds = 0; }
                $log.info(time.format('ss'));
                if(time.format('ss') === '04'){
                  vm.result = false;
                  vm.stop();
                }
              }, 1000);
            }else{
              vm.results = true;
              time = $moment({ second: 0 });
              seconds = 0;
              promise_interval = $interval(function () {
                seconds += 1;
                time.second(seconds);
                if (seconds === 60) { seconds = 0; }
                $log.info(time.format('ss'));
                if(time.format('ss') === '04'){
                  vm.result = false;
                  vm.stop();
                }
              }, 1000);
            }
            vm.user = {};
            $scope.submitted = false;
            vm.userForm = !vm.userForm;
          });
        }
      };

    })
})();
