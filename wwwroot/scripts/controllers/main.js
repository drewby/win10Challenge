'use strict';

/**
 * @ngdoc function
 * @name win10App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the win10App
 */
angular.module('win10Controllers')
  .controller('MainCtrl', ['$scope', 'Contestant', 
    function ($scope, Contestant) {
      $scope.contestants = Contestant.query();
  }]);
