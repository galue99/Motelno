/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('base_url', 'http://localhost:8000/');

})();
