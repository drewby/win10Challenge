'use strict';

/**
 * @ngdoc overview
 * @name win10App
 * @description
 * # win10App
 *
 * Main module of the application.
 */
angular
  .module('win10App')
  .config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/vote/:contestantId', {
        templateUrl: 'views/vote.html',
        controller: 'VoteCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  }]);

