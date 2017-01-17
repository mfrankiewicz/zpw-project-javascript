var appControllers = angular.module('appControllers',[]);

appControllers.controller('mainCtrl', ['$scope', 'dataStorageService', 'authorizationService', function($scope, dataStorageService, authorizationService) {
    $scope.login = function() {
        authorizationService.login({
            email: $scope.login.email,
            password: $scope.login.password
        }).then(function(data) {
            if (data.data.result == "success") {
                dataStorageService.setData('authorized', true);
                $scope.authorized = true;
            }
        });;
    }
    $scope.authorized = true;
}]);

appControllers.controller('navigationCtrl', ['$scope', function($scope) {
    pages = [
        {
            url: "#!/",
            label: "Strona główna",
            active: true
        },
        {
            url: "#!/menu",
            label: "Karta dań"
        },
        {
            url: "#!/reservations",
            label: "Rezerwacje"
        }
    ];

    pages.reverse();

    pages.every(function(page){
        if (window.location.href.match(page.url)) {
            pages[pages.length-1].active = false;
            page.active = true;
            return false;
        }

        return true;
    });
    pages.reverse();
    $scope.pages = pages;
}]);

appControllers.controller('indexCtrl', ['$scope', function($scope) {

}]);

appControllers.controller('menuCtrl', ['$scope', 'dataStorageService', 'dishService', function($scope, dataStorageService, dishService) {
    $scope.dishes = {},
    $scope.dishCategories = {};
    $scope.currentPage = 0;
    $scope.pageSize = 10;
    $scope.dataStorageService = dataStorageService;

    dishService.getDishes().then(function(data) {
        $scope.dishes = data.data;
    });
}]);

appControllers.controller('dishCtrl', ['$scope', '$routeParams', '$location', 'dishService', function($scope, $routeParams, $location, dishService) {

    $scope.dishId = $routeParams.dishId;

    dishService.getDishCategories().then(function(data) {
        $scope.dishCategories = data.data;
        dishService.getDish($scope.dishId).then(function(data) {

            if (data.data) {
                data.data[0].price = data.data[0].price.toFixed(2);
                $scope.dish = data.data[0];
            } else {
                $scope.dish = {};
            }

            $scope.dish.dishCategory = $scope.dishCategories[0];
            angular.forEach($scope.dishCategories, function(dishCategory) {
                if (dishCategory._id == $scope.dish.dishCategoryId) {
                    $scope.dish.dishCategory = dishCategory;
                }
            });
        });
    });

    $scope.addDishPhoto = function() {
        $scope.dish.photos.push('');
    }

    $scope.saveDish = function() {
        if ($scope.dishId) {
            dishService.updateDish($scope.dishId, {
                dishCategoryId: $scope.dish.dishCategory._id,
                label: $scope.dish.label,
                price: $scope.dish.price,
                description: $scope.dish.description,
                photos: $scope.dish.photos,
                available: $scope.dish.available
            });
        } else {
            dishService.addDish({
                dishCategoryId: $scope.dish.dishCategory._id,
                label: $scope.dish.label,
                price: $scope.dish.price,
                description: $scope.dish.description,
                photos: $scope.dish.photos,
                available: $scope.dish.available
            });
        }

        $location.path('/menu');
    }


}]);

appControllers.controller('reservationCtrl', ['$scope', 'dataStorageService', 'dishService', 'reservationService', function($scope, dataStorageService, dishService, reservationService) {
    $scope.dataStorageService = dataStorageService;
    $scope.reservation = dataStorageService.getData('reservation');
    if (!$scope.reservation) {
        $scope.reservation = {};
    }

    $scope.reservation.step = 1;

    dishService.getDishes().then(function(data) {
        $scope.dishes = data.data;
    });

    dishService.getDishCategories().then(function(data) {
        $scope.dishCategories = data.data
    });

    reservationService.getTables().then(function(data) {
        $scope.tables = data.data;
    });

    reservationService.getReservations().then(function(data) {
        $scope.reservations = data.data;
    });

    $scope.getAvailableTables = function() {
        angular.forEach($scope.tables, function(table, key) {
            table.available = true;

            angular.forEach($scope.reservations, function(reservation) {
                if (reservation.tableId == table._id && Math.abs(reservation.date - $scope.reservation.date) < 7200) {
                    table.available = false;
                }
            });
        });

        return $scope.tables;
    }

    $scope.setReservationDate = function() {
        if ($scope.reservation.datetime) {
            $scope.getAvailableTables();
            $scope.reservation.date = $scope.reservation.datetime.valueOf()/1000;
            $scope.reservation.tableId = null;
            dataStorageService.setData('reservation', $scope.reservation);
        } else {
            dataStorageService.setData('reservation', null);
        }
    }

    $scope.setReservationTable = function(event, tableId) {
        if (!$(event.target).hasClass('unavailable')) {
            $('section#reservation .table-map .table').removeClass('active');
            $(event.target).addClass('active');

            $scope.reservation.tableId = tableId;
            dataStorageService.setData('reservation', $scope.reservation);
        }
    }

    $scope.getDishLabelByDishId = function(dishId) {
        var label = '';

        angular.forEach($scope.dishes, function(dish) {
            if (dish._id == dishId) {
                label = dish.label;
            }
        });

        return label;
    }

    $scope.removeDishFromReservation = function(dishId) {
        reservation = dataStorageService.getData('reservation');

        if (reservation.dishes == undefined) {
            reservation.dishes = [];
        }

        angular.forEach(reservation.dishes, function(dish, key) {
            if (dish.dishId == dishId) {
                dish.quantity--;

                if (dish.quantity == 0) {
                    reservation.dishes.splice(key, 1);
                }
            }
        });

        dataStorageService.setData('reservation', reservation);
    }

    $scope.addReservation = function() {
        reservationService.addReservation($scope.reservation);
        dataStorageService.setData('reservation', {});
        $scope.reservation.step = 3;
    }

    $scope.getAvailableTables();
}]);
