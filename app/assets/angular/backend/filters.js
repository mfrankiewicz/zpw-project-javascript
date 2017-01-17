var appFilters = angular.module('appFilters', []);

appFilters.filter('startFrom', function() {
    return function(input, start) {
        if (!input.length) {
            return input;
        }
        start = +start;
        return input.slice(start);
    }
});
