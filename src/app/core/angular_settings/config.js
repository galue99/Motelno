(function() {
  'use strict';

  angular
      .module('motelNo')
      .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig,$authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $authProvider.loginUrl = 'http://127.0.0.1:8000/token-auth';
    $authProvider.loginUrl = 'http://192.168.0.100:8001/token-auth';
    $authProvider.tokenName = 'token';
    $authProvider.tokenPrefix = 'motel7';
    $authProvider.authToken= "Token";
    $authProvider.authHeader = 'Authorization';
      /*Set options third-party lib*/

    toastrConfig.allowHtml = true;
    toastrConfig.timeOut = 3000;
    toastrConfig.positionClass = 'toast-top-right';
    toastrConfig.preventDuplicates = true;
    toastrConfig.progressBar = true;

  }

})();
