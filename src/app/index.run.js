(function() {
  'use strict';

  angular
    .module('motelNo')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
