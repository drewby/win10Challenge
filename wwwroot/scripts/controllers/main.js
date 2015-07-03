'use strict';

/**
 * @ngdoc function
 * @name win10App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the win10App
 */
angular.module('win10Controllers')
  .controller('MainCtrl', ['$scope', '$cookies', 'Contestant', 
    function ($scope, $cookies, Contestant) {
      Contestant.query(function(contestants) {
        contestants.forEach(function(contestant) {
            contestant.voted = $cookies.get(contestant.id);
        });
        $scope.contestants = contestants; 
      });
  }]);
