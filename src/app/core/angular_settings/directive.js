(function() {
  'use strict';

  angular
    .module('motelNo')
    .directive('alertMessage', alertMessage)
    .directive('footerTemplate', footerTemplate)
    .directive('sidebarTemplate', sidebarTemplate)
    .directive('headerTemplate', headerTemplate)
    .directive('postsPagination', postsPagination)
    .directive('body', body)
    .directive('ngThumb', ngThumb);

  /** @ngInject */
  function alertMessage() {
    var directive = {
      restrict: 'E',
      scope: {
        element: '='
      },
      templateUrl: 'app/core/directive/alert_message.html'
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
  function ngThumb($window) {
    var helper = {
      support: !!($window.FileReader && $window.CanvasRenderingContext2D),
      isFile: function(item) {
        return angular.isObject(item) && item instanceof $window.File;
      },
      isImage: function(file) {
        var type =  '|' + file.type.slice(file.type.lastIndexOf('/') + 1) + '|';
        return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
      }
    };

    return {
      restrict: 'A',
      template: '<canvas/>',
      link: function(scope, element, attributes) {
        if (!helper.support) return;

        var params = scope.$eval(attributes.ngThumb);

        if (!helper.isFile(params.file)) return;
        if (!helper.isImage(params.file)) return;

        var canvas = element.find('canvas');
        var reader = new FileReader();

        reader.onload = onLoadFile;
        reader.readAsDataURL(params.file);

        function onLoadFile(event) {
          var img = new Image();
          img.onload = onLoadImage;
          img.src = event.target.result;
        }

        function onLoadImage() {
          var width = params.width || this.width / this.height * params.height;
          var height = params.height || this.height / this.width * params.width;
          canvas.attr({ width: width, height: height });
          canvas[0].getContext('2d').drawImage(this, 0, 0, width, height);
        }
      }
    };

  }


})();
