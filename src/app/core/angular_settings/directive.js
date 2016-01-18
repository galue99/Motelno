/**
 * Created by edgar on 16/01/16.
 */
(function() {
  'use strict';

  angular
    .module('motelNo')
    .directive('alertMessage', function () {
      return {
        restrict: 'E',
        scope: {
          element: '='
        },
        templateUrl: 'app/core/directive/alert_message.html'
      };
    })
    .directive('footerTemplate', function () {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/app/core/directive/footer.html'
      };
    })
    .directive('sidebarTemplate', function () {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/app/core/directive/main-sidebar.html'
      };
    })
    .directive('headerTemplate', function () {
      return {
        restrict: 'E',
        transclude: true,
        templateUrl: '/app/core/directive/header.html'
      };
    })
    .directive('body', [function(){
      return {
        restrict: 'E',
        link: function(scope, element) {
          scope.$on('body:class:add', function(e, name){
            element.addClass(name);
          });
          scope.$on('body:class:remove', function(e, name){
            element.removeClass(name);
          });
        }
      };
    }])

})();
