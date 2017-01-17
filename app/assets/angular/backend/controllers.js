var appControllers = angular.module('appControllers',[]);

appControllers.controller('mainCtrl', ['$scope', 'dataStorageService', function($scope, dataStorageService) {

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
        var dishes = [];

        angular.forEach(data.data, function(dish, key) {
            if (dish.available) {
                dishes.push(dish);
            }
        });
        $scope.dishes = dishes;
    });

    dishService.getDishCategories().then(function(data) {
        $scope.dishCategory = {_id:0, label: 'wybierz kategorię dania'};
        $scope.dishCategories = [{_id:0, label: 'wybierz kategorię dania'}].concat(data.data);
    });

    $scope.getDishCountByCategoryId = function(categoryId) {
        var count = 0;
        if (!categoryId) {
            return $scope.dishes.length;
        }

        angular.forEach($scope.dishes, function(dish, key) {
            if (dish.dishCategoryId == categoryId) {
                count++;
            }
        });

        return count;
    };

    $scope.numberOfPages = function(){
        return Math.ceil($scope.getDishCountByCategoryId($scope.dishCategory._id)/$scope.pageSize);
    }

    $scope.addDishToReservation = function(dishId) {
        var newDish = true;

        reservation = dataStorageService.getData('reservation');

        if (reservation.dishes == undefined) {
            reservation.dishes = [];
        }

        angular.forEach(reservation.dishes, function(dish, key) {
            if (dish.dishId == dishId) {
                dish.quantity++;
                newDish = false;
            }
        });

        if (newDish) {
            reservation.dishes.push({
                dishId: dishId,
                quantity: 1
            });
        }

        dataStorageService.setData('reservation', reservation);
    }

}]);

appControllers.controller('dishCtrl', ['$scope', '$location', 'socket', 'dataStorageService', 'dishService', function($scope, $location, socket, dataStorageService, dishService) {
    var dishId = dataStorageService.getData('detailsDishId');//'587b9b7fbc202f0740e4cea1';

    if (!dishId) {
        $location.path('/menu');
    }

    dishService.getDish(dishId).then(function(data) {
        $scope.dish = data.data[0];
    });

    dishService.getDishCategories().then(function(data) {
        angular.forEach(data.data, function(dishCategory) {
            if ($scope.dish.dishCategoryId == dishCategory._id) {
                $scope.dishCategory = dishCategory;
            }
        });
    });

    $scope.getDishComments = function() {
        dishService.getDishComments(dishId).then(function(data) {
            $scope.dishComments = data.data;
        });
    }

    $scope.getDishRating = function() {
        dishService.getDishRatings(dishId).then(function(data) {
            var count = 0;
            var sum = 0;
            angular.forEach(data.data, function(dishRating) {
                count++;
                sum += dishRating.rating;
            });

            if (!count && !sum) {
                $scope.rating = 'brak ocen';
            } else {
                $scope.rating = (sum/count).toFixed(2);
            }
        });
    }

    $scope.rateDish = function(dishId, rating) {
        dishService.addDishRating({
            dishId: dishId,
            rating: rating
        });
        $scope.rated = true;
    }

    $scope.addDishComment = function(dishId) {
        dishService.addDishComment({
            dishId: dishId,
            author: $scope.dishComment.author,
            comment: $scope.dishComment.comment,
            dateAdded: new Date().valueOf()
        })
    }

    socket.on('message', function (message) {
        switch (message) {
            case "DishCommentAdded":
                $scope.getDishComments();
                break;
            case "DishRatingAdded":
                $scope.getDishRating();
                break;
        }
    });

    $scope.getDishRating();
    $scope.getDishComments();
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
