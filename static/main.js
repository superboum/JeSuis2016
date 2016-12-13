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
 .controller('InitController', ['$scope', '$location', function($scope, $location) {
   console.log("init-controller");
   $scope.start = function() { 
     screenfull.request();
     $location.path('/event'); 
   };
 }])
 .controller('EventController', ['$scope', '$location', function($scope, $location) {
   console.log("event-controller");
 }])
;

