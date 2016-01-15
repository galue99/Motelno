/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .factory('EventService', function ($resource)  {
      return $resource("http://192.168.0.100:8001/Event/:event", {}, {
        query: { method: "GET", isArray: false }
      });
    });
})();
