var appFilters = angular.module('appFilters', []);

appFilters.filter('startFrom', function() {
    return function(input, start) {
        start = +start;
        return input.slice(start);
    }
});

appFilters.filter('dishCategoryFilter', function() {
    return function(input, category) {
        var result = [];

        if (category == undefined || category._id == 0) {
            return input;
        }
        angular.forEach(input, function(dish, key) {
            if (dish.dishCategoryId == category._id) {
                result.push(dish);
            }
        });

        return result;
    }
});
