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
      .when('/result', {
        templateUrl: 'partials/result.html',
        controller: 'ResultController',
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

  .controller('EventController', ['$scope', '$location', '$anchorScroll', "$interval", '$rootScope', function($scope, $location, $anchorScroll, $interval, $rootScope) {
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
      if (id >= window.content.length) { $location.path('/result'); return; }

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
  }])
  .controller('ResultController', ['$scope', '$location', '$interval', function($scope, $location, $interval) {
    var nbPics = 3;
    var pickPic = function() { return window.content[Math.floor(Math.random() * window.content.length)].article.video.png;  };
    $scope.content = window.content;
    $scope.pics = ["", "", ""];
    for (var i=0; i<nbPics; i++) { $scope.pics[i] = pickPic(); }

    console.log($scope.pics);
    var stop = $interval(function() {
      var select = Math.floor(Math.random() * $scope.pics.length);
      var pic = pickPic();
      if ($scope.pics.indexOf(pic) == -1) $scope.pics[select] = pic
    },1000)
  }])
;

