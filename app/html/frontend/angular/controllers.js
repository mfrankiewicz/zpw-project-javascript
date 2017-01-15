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

appControllers.controller('menuCtrl', function($scope, dishService) {
    $scope.dishes = {},
    $scope.dishCategories = {};
    $scope.currentPage = 0;
    $scope.pageSize = 10;

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

appControllers.controller('dishCtrl', function($scope) {

});

appControllers.controller('reservationCtrl', function($scope) {

});

appControllers.controller('contactCtrl', function($scope) {

});
