'use strict';

/* Services */
var appServices = angular.module('win10Services');

appServices.factory('Contestant', ['$resource',
        function($resource) {
                return $resource('contestants/:contestantId.json', {}, {
                        query: {method:'GET', params:{contestantId:'contestants'}, isArray:true}
                });
        }]);