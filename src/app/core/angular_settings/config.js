(function() {
  'use strict';

  angular
      .module('motelNo')
      .config(config);

  /** @ngInject */
  function config($logProvider, toastrConfig, $authProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $authProvider.loginUrl = 'http://frozen-mountain-22587.herokuapp.com/token-auth';
    $authProvider.loginUrl = 'http://192.168.0.107:8000/token-auth';
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
