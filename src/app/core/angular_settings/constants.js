/* global malarkey:false, moment:false */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .constant('malarkey', malarkey)
    .constant('moment', moment)
    .constant('LOGIN_URL', 'token-auth')
    .constant('base_url', 'http://motelo7qab.herokuapp.com/');
  //.constant('base_url', 'http://190.8.170.136:8000/');

})();
