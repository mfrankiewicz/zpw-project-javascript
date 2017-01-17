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

appFilters.filter('dateFilter', function() {
    return function(input, date) {
        var result = [];

        angular.forEach(input, function(reservation, key) {
            var reservationDate = new Date(reservation.date*1000);
            reservationDate.setHours(0,0,0,0);

            if (date == undefined) {
                result.push(reservation);
            } else {
                if (date.date) {
                    if (reservationDate.valueOf() == date.date.valueOf()) {
                        result.push(reservation);
                    }
                } else if (date.dateFrom && date.dateTo) {
                    if (reservationDate.valueOf() >= date.dateFrom.valueOf()
                        && reservationDate.valueOf() <= date.dateTo.valueOf()) {
                        result.push(reservation);
                    }
                } else {
                    result.push(reservation);
                }
            }
        });

        return result;
    }
});
