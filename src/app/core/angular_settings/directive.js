(function() {
  'use strict';

  angular
    .module('motelNo')
    .directive('footerTemplate', footerTemplate)
    .directive('sidebarTemplate', sidebarTemplate)
    .directive('headerTemplate', headerTemplate)
    .directive('postsPagination', postsPagination)
    .directive('body', body)
    .directive('onlyNumber', onlyNumber);

  /** @ngInject */
  function onlyNumber() {
    var directive = {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, element, attrs, modelCtrl) {
        modelCtrl.$parsers.push(function (inputValue) {
          if (inputValue === angular.isUndefined){ return ''; }
          var transformedInput = inputValue.replace(/[^0-9]+/g, '');
          if (transformedInput !== inputValue) {
            modelCtrl.$setViewValue(transformedInput);
            modelCtrl.$render();
          }
        });
      }
    };
    return directive;
  }

  /** @ngInject */
  function footerTemplate() {
    var directive = {
      restrict: 'E',
      scope: {
        element: '='
      },
      template: '<footer class="main-footer" data-ng-show="element">' +
      '<div class="pull-right hidden-xs">' +
      '<b>Version</b> 0.1.0' +
      '</div>' +
      '<strong>Copyright &copy; 2015-2016 <a href="#">4Geeks</a>.</strong> All rights reserved.' +
      '</footer>'
    };

    return directive;
  }

  /** @ngInject */
  function sidebarTemplate() {
    var directive = {
      restrict: 'E',
      scope: {
        element: '='
      },
      templateUrl: 'app/core/directive/main-sidebar.html'
    };
    return directive;
  }

  /** @ngInject */
  function headerTemplate() {
    var directive = {
      restrict: 'E',
      scope: {
        element: '='
      },
      templateUrl: 'app/core/directive/header.html'
    };
    return directive;
  }

  /** @ngInject */
  function postsPagination() {
    var directive = {
      restrict: 'E',
      bindToController: true,
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

    return directive;
  }

  /** @ngInject */
  function body() {
    var directive = {
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

    return directive;

  }


})();
