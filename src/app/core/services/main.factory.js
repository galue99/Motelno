/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .factory('EventService', function ($resource, base_url)  {
      return {
        Event: $resource(base_url + 'Event/:id', {id: '@id'},{'update':{ method:'PUT'}}),
        Participant: $resource(base_url + 'Participant/:id', {id: '@id'},{'update':{ method:'PUT'}}),
        User: $resource(base_url + 'User/:id', {id: '@id'},{'update':{ method:'PUT'}})
      };
    });
})();
