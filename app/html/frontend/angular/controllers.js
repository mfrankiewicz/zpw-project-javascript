var appControllers = angular.module('appControllers',[]);

appControllers.controller('mainCtrl', function($scope) {
    console.log('injected');
});

appControllers.controller('sliderCtrl', function($scope) {
    $scope.slides = [
        'http://placehold.it/1920x300/015b8d/ffffff',
        'http://placehold.it/1920x300/e82a30/ffffff',
        'http://placehold.it/1920x300/00a4ce/ffffff',
        'http://placehold.it/1920x300/12a750/ffffff',
        'http://placehold.it/1920x300/94bd00/ffffff',
        'http://placehold.it/1920x300/bfa129/ffffff',
        'http://placehold.it/1920x300/9c29bf/ffffff'
    ];
});

appControllers.controller('navigationCtrl', function($scope) {
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
});

appControllers.controller('indexCtrl', function($scope) {

});

appControllers.controller('aboutUsCtrl', function($scope) {

});

appControllers.controller('menuCtrl', function($scope, dataStorageService, dishService) {
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
});

appControllers.controller('dishCtrl', function($scope, $location, socket, dataStorageService, dishService) {
    var dishId = '587b9b7fbc202f0740e4cea1';//dataStorageService.getData('detailsDishId');

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

            $scope.rating = (sum/count).toFixed(2);
        });
    }

    $scope.rateDish = function(dishId, rating) {
        dishService.addDishRating({
            dishId: dishId,
            rating: rating
        });
        $scope.rated = true;
        $scope.getDishRating();
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
        if (message == "DishCommentAdded") {
            $scope.getDishComments();
        }
    });

    $scope.getDishRating();
    $scope.getDishComments();
});

appControllers.controller('reservationCtrl', function($scope) {

});

appControllers.controller('contactCtrl', function($scope) {

});
