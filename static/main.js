var content = [
  {
    article: {
      title: "Bowie",
      date: "16/02",
      text: "RT si t'es triste",
      video: {
        webm: "/video/David_Bowie_Heroes.mkv.webm",
        mp4: "/video/David_Bowie_Heroes.mkv.mp4",
        png: "/video/David_Bowie_Heroes.mkv.png",
      }
    },
    question: {
      ask: "Nombre d'enfants",
      answers: [
        { text: "3", win: true},
        { text: "26", win: false}
      ]
    }
  },
  {
    article: {
      title: "Loi travail",
      date: "16/02",
      text: "Travailler plus pour gagner plus",
      video: {
        webm: "/video/polina.webm",
        mp4: "/video/polina.mp4",
        png: "/video/David_Bowie_Heroes.mkv.png",
      }
    },
    question: {
      ask: "Nombre d'enfants",
      answers: [
        { text: "3", win: true},
        { text: "26", win: false}
      ]
    }
  },
];

var app = angular.module('jesuis', ['ngRoute'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider
      .when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'InitController'
      })
      .when('/event', {
        templateUrl: 'partials/event.html',
        controller: 'EventController'
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
     screenfull.request();
     $location.path('/event');
   };
 }])

 .controller('EventController', ['$scope', '$location', function($scope, $location) {
   console.log("event-controller");
   $scope.selected_content = 0;
   $scope.content = content;
   $scope.next = function() {
     $scope.selected_content += 1;
     $scope.load();
     console.log("coucou");
   };
 }])
;

