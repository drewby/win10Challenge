'use strict';

/**
 * @ngdoc function
 * @name win10App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the win10App
 */
angular.module('win10Controllers')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
