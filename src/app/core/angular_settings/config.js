(function() {
  'use strict';

  angular
      .module('motelNo')
      .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider, base_url) {
    // Enable log
    $logProvider.debugEnabled(true);
    $authProvider.loginUrl = base_url + 'token-auth';
    //$authProvider.loginUrl = 'http://motelo7qab.herokuapp.com/token-auth';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'motel7';
    $authProvider.authToken= "Token";
    $authProvider.authHeader = 'Authorization';
      /*Set options third-party lib*/

    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = false;
    toastrConfig.progressBar = false;

  }

})();
