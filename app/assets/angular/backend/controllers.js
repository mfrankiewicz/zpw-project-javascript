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

appControllers.controller('reservationCtrl', ['$scope', '$routeParams', 'dishService', 'reservationService', function($scope, $routeParams, dishService, reservationService) {

    $scope.reservationId = $routeParams.reservationId;

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

    reservationService.getReservation($scope.reservationId).then(function(data) {
        $scope.reservation = data.data[0];
    });


    $scope.getDishLabelByDishId = function(dishId) {
        var label = '';

        angular.forEach($scope.dishes, function(dish) {
            if (dish._id == dishId) {
                label = dish.label;
            }
        });

        return label;
    }

}]);
