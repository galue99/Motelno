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
    .directive('postsPagination', function(){
      return{
        restrict: 'E',
        template: '<ul class="pagination">'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getPosts(1)">&laquo;</a></li>'+
        '<li ng-show="currentPage != 1"><a href="javascript:void(0)" ng-click="getPosts(currentPage-1)">&lsaquo; Prev</a></li>'+
        '<li ng-repeat="i in range" ng-class="{active : currentPage == i}">'+
        '<a href="javascript:void(0)" ng-click="getPosts(i)">{{i}}</a>'+
        '</li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getPosts(currentPage+1)">Next &rsaquo;</a></li>'+
        '<li ng-show="currentPage != totalPages"><a href="javascript:void(0)" ng-click="getPosts(totalPages)">&raquo;</a></li>'+
        '</ul>'
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
