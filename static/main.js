var app = angular.module('jesuis', ['ngRoute','duScroll'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'InitController'
      })
      .when('/event', {
        templateUrl: 'partials/event.html',
        controller: 'EventController',
        reloadOnSearch: false
      })
      .otherwise({
        redirectTo: '/init'
      })
  }])

  .filter("trustUrl", ['$sce', function ($sce) {
    return function (recordingUrl) {
      return $sce.trustAsResourceUrl(recordingUrl);
    };
  }])

  .controller('InitController', ['$scope', '$location', function($scope, $location) {
    console.log("init-controller");
    $scope.start = function() {
      var elem = document.documentElement;
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen();
      }
      $location.path('/event');
    };
  }])

  .controller('EventController', ['$scope', '$location', '$anchorScroll', "$interval", '$rootScope', '$document' ,function($scope, $location, $anchorScroll, $interval, $rootScope,$document) {
    console.log("event-controller");
    $scope.selected_content = -1;
    $rootScope.myAnswers = {};
    $scope.content = window.content;
    $scope.content_top = window.content.filter(function(element, index) {  return index % 2 == 1; });
    $scope.content_bottom = window.content.filter(function(element, index) {  return index % 2 == 0; });
    $scope.choose = function(id, value) {
      if (id != $scope.selected_content) return;
      $rootScope.myAnswers[window.content[id].slug] = window.content[id].question.answers[value].win;
    };
    $scope.next = function(id) {
      if (id >= window.content.length) return;

      var selectedVideo = document.getElementById("video-"+id);
      window.content.forEach(function(elem, index) {
        if (index != id) {
          var video = document.getElementById("video-"+index);
          video.pause();
        }
      });

      var nextSection = angular.element(document.getElementById("event-"+id));
      console.log("id: "+id);
      console.log("nextSection: "+nextSection);
      $document.scrollToElementAnimated(nextSection);
      $scope.selected_content = id;
      //$location.hash("event-"+$scope.selected_content);
      //$anchorScroll();
      selectedVideo.play();
    };
  }])
;
