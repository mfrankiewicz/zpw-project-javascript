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

appServices.service('dishService', ['$http', '$q', function($http, $q){
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
        updateDish: function(dishId, dish) {
            return $http.put('/dishes/' + dishId, dish);
        },
        addDish: function(dish) {
            return $http.post('/dishes/', dish);
        }
    }
}]);

appServices.service('reservationService', ['$http', '$q', function($http, $q){
    return {
        getTables: function() {
            var defer = $q.defer();

            $http.get('/tables').then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        getReservations: function() {
            var defer = $q.defer();

            $http.get('/reservations').then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        addReservation: function(reservation) {
            var defer = $q.defer();

            return $http.post('/reservations/', reservation);
        }
    }
}]);

appServices.service('authorizationService', ['$http', '$q', function($http, $q){
    return {
        login: function(authorizationData) {
            var defer = $q.defer();

            $http.post('/login/', authorizationData).then(function(data) {
                defer.resolve(data);
            });;

            return defer.promise;
        }
    }
}]);
