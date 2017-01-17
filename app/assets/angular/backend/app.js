var app = angular.module('backendApp', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appFilters'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'views/index.html', controller: 'indexCtrl' })
        .when('/menu/', { templateUrl: 'views/menu.html', controller: 'menuCtrl' })
        .when('/menu/dish/add/', { templateUrl: 'views/dish.html', controller: 'dishCtrl' })
        .when('/menu/dish/edit/:dishId', { templateUrl: 'views/dish.html', controller: 'dishCtrl' })
        .when('/reservations/', { templateUrl: 'views/reservations.html', controller: 'reservationCtrl' })
        .otherwise({ redirectTo: '/' });
}]);
