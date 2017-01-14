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
