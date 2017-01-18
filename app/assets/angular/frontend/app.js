var app = angular.module('frontendApp', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appFilters',
    'appDirectives',
    'uiGmapgoogle-maps'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/', { templateUrl: 'views/index.html', controller: 'indexCtrl' })
        .when('/about-us', { templateUrl: 'views/about-us.html', controller: 'aboutUsCtrl' })
        .when('/menu/', { templateUrl: 'views/menu.html', controller: 'menuCtrl' })
        .when('/menu/dish', { templateUrl: 'views/dish.html', controller: 'dishCtrl' })
        .when('/reservation', { templateUrl: 'views/reservation.html', controller: 'reservationCtrl' })
        .when('/contact', { templateUrl: 'views/contact.html', controller: 'contactCtrl' })
        .otherwise({ redirectTo: '/' });
}]);
