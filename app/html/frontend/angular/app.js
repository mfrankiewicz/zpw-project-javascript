var app = angular.module('frontendApp', [
    'ngRoute',
    'appControllers',
    'appServices',
    'appFilters'
]);

app.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        .when('/shop', { templateUrl: 'views/testview.html', controller: 'mainCtrl' })
        .when('/shop/add-product', { templateUrl: 'views/testview.html', controller: 'mainCtrl' })
        .when('/shop/cart', { templateUrl: 'views/testview.html', controller: 'mainCtrl' })
        .when('/order/add', { templateUrl: 'views/testview.html', controller: 'mainCtrl' })
        .otherwise({ redirectTo: '/' });
}]);
