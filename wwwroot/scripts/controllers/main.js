'use strict';

/**
 * @ngdoc function
 * @name win10App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the win10App
 */
angular.module('win10Controllers')
  .controller('MainCtrl', ['$scope', '$cookies', '$location', 'Contestant', 
    function ($scope, $cookies, $location, Contestant) {
      function updateList() {
          Contestant.query(function(contestants) {
          contestants.forEach(function(contestant) {
              contestant.voted = $cookies.get(contestant.id);
          });
          $scope.contestants = contestants; 
        });
      }
      
      $scope.clearVotes = function() {
        $scope.contestants.forEach(function(contestant) {
            $cookies.remove(contestant.id);
        });
        
        
      };
 
      updateList();
      
  }]);
