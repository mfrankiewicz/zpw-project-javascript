var appServices = angular.module('appServices', []);

appServices.service('dataStorageService', function(){
    return {
        data: [],
        setData: function(key, data) {
            this.data.push({
                key: key,
                data: data
            });

            return this;
        },
        getData: function(key) {
            var result = null;
            angular.forEach(this.data, function(item) {
                if (item.key == key) {
                    result = item.data;
                }
            });

            return result;
        }
    }
});


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
        },
        getDish: function(dishId) {
            var defer = $q.defer();

            $http.get('/dishes/'+dishId).then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        rateDish: function(dishId, rating) {
            var defer = $q.defer();

            return $http.post('/dish-ratings/', {
                dishId: dishId,
                rating: rating
            });

            return defer.promise;
        },
        getDishRatings: function(dishId) {
            var defer = $q.defer();

            $http.get('/dish-ratings/'+dishId).then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        }
    }
});
