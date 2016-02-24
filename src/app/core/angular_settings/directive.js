(function() {
  'use strict';

  angular
    .module('motelNo')
    .directive('footerTemplate', footerTemplate)
    .directive('sidebarTemplate', sidebarTemplate)
    .directive('headerTemplate', headerTemplate)
    .directive('postsPagination', postsPagination)
    .directive('body', body)
    .directive('onlyNumber', onlyNumber)
    .directive('spinnerDirective', SpinnerDirective)

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
      '<strong>Copyright &copy; 2015-2016 <a href="#">MotelNo7</a>.</strong> All rights reserved.' +
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

  function SpinnerDirective($timeout) {
    return {
      restrict: 'E',
      template: '<i class="fa fa-cog fa-spin"></i>',
      scope: {
        show: '=',
        delay: '@'
      },
      link: function(scope, elem, attrs) {
        var showTimer;

        //This is where all the magic happens!
        // Whenever the scope variable updates we simply
        // show if it evaluates to 'true' and hide if 'false'
        scope.$watch('show', function(newVal){
          newVal ? showSpinner() : hideSpinner();
        });

        function showSpinner() {
          //If showing is already in progress just wait
          if (showTimer) return;

          //Set up a timeout based on our configured delay to show
          // the element (our spinner)
          showTimer = $timeout(showElement.bind(this, true), getDelay());
        }

        function hideSpinner() {
          //This is important. If the timer is in progress
          // we need to cancel it to ensure everything stays
          // in sync.
          if (showTimer) {
            $timeout.cancel(showTimer);
          }

          showTimer = null;

          showElement(false);
        }

        function showElement(show) {
          show ? elem.css({display:''}) : elem.css({display:'none'});
        }

        function getDelay() {
          var delay = parseInt(scope.delay);

          return isNaN(delay) ? 200 : delay;
        }
      }
    };
  }


})();
