var appServices = angular.module('appServices', []);

appServices.service('dishService', function($http, $q){
    return {
        getDishes: function() {
            var defer = $q.defer();

            $http.get('/dishes').then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        getDishCategories: function() {
            var defer = $q.defer();

            $http.get('/dish-categories').then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        }
    }
});
