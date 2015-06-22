'use strict';

/* Services */
var appServices = angular.module('win10Services');

appServices.factory('Contestant', ['$resource',
    function($resource) {
        return $resource('contestants/:contestantId.json', {}, {
            query: {method:'GET', params:{contestantId:'contestants'}, isArray:true}
    });
}]);
        
appServices.factory('SubmitVote', ['$http', function($http) {
        
       var sendVote = function(contestantId, value, impact) {
            return $http.post("/api/Vote", "{ 'contestantId' : '" + contestantId + "', 'value' : " + value + ", 'impact' : " + impact + " }");
       };

       return { send : sendVote };
}]);

