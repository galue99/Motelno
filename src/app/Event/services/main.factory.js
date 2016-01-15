/**
 * Created by edgar on 14/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .factory('EventService', function ($resource, base_url)  {
      /*return $resource(base_url + 'Event/:id', { id: '@_id' }, {
        query: {method:'GET', params:{fileName:'services.json'}, isArray:false}
      })*/
      return {
        Event: $resource(base_url + 'Event/:id', {id: '@id'}),
        User:  $resource(base_url + 'User/:id', {id: '@id'}),
        Participant:  $resource(base_url + 'Participant/:id', {id: '@id'})
      };
    });
})();


//return $resource('http://192.168.0.100:8001/Event/:id', { id: '@_id' }, {
