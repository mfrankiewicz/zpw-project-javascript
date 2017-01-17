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

appServices.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://zpw.loc');

    return {
        on: function (eventName, callback) {
            function wrapper() {
            var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
            socket.removeListener(eventName, wrapper);
            };
        },
        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

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
        addDishRating: function(dishRating) {
            var defer = $q.defer();

            return $http.post('/dish-ratings/', dishRating);
        },
        getDishRatings: function(dishId) {
            var defer = $q.defer();

            $http.get('/dish-ratings/'+dishId).then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        getDishComments: function(dishId) {
            var defer = $q.defer();

            $http.get('/dish-comments/'+dishId).then(function(data) {
                defer.resolve(data);
            });

            return defer.promise;
        },
        addDishComment: function(dishComment) {
            var defer = $q.defer();

            return $http.post('/dish-comments/', dishComment);
        },
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
