var app = angular.module('jesuis', ['ngRoute'])
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

  .controller('EventController', ['$scope', '$location', '$anchorScroll', "$interval", function($scope, $location, $anchorScroll, $interval) {
    console.log("event-controller");
    $scope.selected_content = -1;
    $scope.content = window.content;
    $scope.content_top = window.content.filter(function(element, index) {  return index % 2 == 1; });
    $scope.content_bottom = window.content.filter(function(element, index) {  return index % 2 == 0; });
    $scope.next = function(id) {
      if (id >= window.content.length) return;

      var selectedVideo = document.getElementById("video-"+id);
      window.content.forEach(function(elem, index) {
        if (index != id) {
          var video = document.getElementById("video-"+index);
          video.pause();
        }
      });

      $scope.selected_content = id;
      $location.hash("event-"+$scope.selected_content);
      $anchorScroll();
      selectedVideo.play();
    };
    //var loaded = $interval(function() {
      //try { $scope.next(0); $interval.cancel(loaded); }
      //catch (e) { console.log("waiting..."); }
    //},500);
  }])
;

