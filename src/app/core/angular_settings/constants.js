/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('LOGIN_URL', 'token-auth')
    .constant('base_url', 'http://motelo7qab.herokuapp.com/');

})();
