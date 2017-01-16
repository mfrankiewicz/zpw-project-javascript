var appControllers = angular.module('appControllers',[]);

appControllers.controller('mainCtrl', ['$scope', function($scope) {
    console.log('injected');
}]);

appControllers.controller('sliderCtrl', ['$scope', function($scope) {
    $scope.slides = [
        'http://placehold.it/1920x300/015b8d/ffffff',
        'http://placehold.it/1920x300/e82a30/ffffff',
        'http://placehold.it/1920x300/00a4ce/ffffff',
        'http://placehold.it/1920x300/12a750/ffffff',
        'http://placehold.it/1920x300/94bd00/ffffff',
        'http://placehold.it/1920x300/bfa129/ffffff',
        'http://placehold.it/1920x300/9c29bf/ffffff'
    ];
}]);

appControllers.controller('navigationCtrl', ['$scope', function($scope) {
    pages = [
        {
            url: "#!/",
            label: "Strona główna",
            active: true
        },
        {
            url: "#!/about-us",
            label: "O właścicielach"
        },
        {
            url: "#!/menu",
            label: "Menu"
        },
        {
            url: "#!/reservation",
            label: "Rezerwacja"
        },
        {
            url: "#!/contact",
            label: "Kontakt"
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

appControllers.controller('aboutUsCtrl', ['$scope', function($scope) {

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

    // $scope.getAvailableTables = function() {
    //     angular.forEach($scope.tables, function(table) {
    //         var available = true;
    //
    //         angular.forEach($scope.reservations, function(reservation) {
    //             if (new Date().valueOf() < reservation.date
    //                 && reservation.tableId == table._id)
    //         });
    //     });
    // }

}]);

appControllers.controller('contactCtrl', ['$scope', function($scope) {

}]);
