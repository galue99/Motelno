(function() {
  'use strict';

  angular
    .module('motelNo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log, $rootScope) {
    $log.debug('runBlock end');
  }

})();
