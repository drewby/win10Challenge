/// <reference path="../../../typings/jquery/jquery.d.ts"/>
/// <reference path="../../../typings/angularjs/angular.d.ts"/>
'use strict';

/**
 * @ngdoc function
 * @name win10App.controller:VoteCtrl
 * @description
 * # VoteCtrl
 * Controller of the win10App
 */
angular.module('win10Controllers')
  .controller('VoteCtrl', ['$scope', '$routeParams', '$location', 'Contestant', 'SubmitVote', '$modal', 
    function ($scope, $routeParams, $location, Contestant, SubmitVote, $modal) {
    
    Contestant.get({contestantId: $routeParams.contestantId}, function(contestant) {
      $scope.contestant = contestant ;
      $scope.contestant.contestantId = $routeParams.contestantId;
    });
    
    $scope.submitVote = function(some) {
      var contestantId = $('#contestantId').val();
      var value = $('#valueInput').val();
      var impact = $('#impactInput').val();
      
      SubmitVote.send(contestantId, value, impact).then(function (success) {
           var modalInstance = $modal.open({
                animation: true,
                templateUrl: 'voteAccepted.html',
                size: 'sm'
           });

            modalInstance.result.then(function (selectedItem) {
                $location.path('main');
            });

        
      });
    };
    
    var voteOptions = {
      'size' : 'xs',
      'stars' : 10, 
      'showClear': false,
      'min' : 1,
      'max' : 10,
      'step' : 1,
      'starCaptions' : {
        1: 'OK',
        2: 'Good',
        3: 'Better',
        4: 'Nice',
        5: 'Great',
        6: 'Wow',
        7: 'Amazing',
        8: 'Incredible',
        9: 'Segoi!',
        10: 'Send to MGX!'  
      },
      starCaptionClasses: {
         1: 'label label-danger',
         2: 'label label-danger',
         3: 'label label-warning',
         4: 'label label-warning',
         5: 'label label-info',
         6: 'label label-info',
         7: 'label label-primary',
         8: 'label label-primary',
         9: 'label label-success',
         10: 'label label-success',
      }
      };
    
    voteOptions.captionElement = "#captionValue";
    $("#valueInput").rating(voteOptions);   
 
    voteOptions.captionElement = "#captionImpact";
    $("#impactInput").rating(voteOptions);
  }]);
