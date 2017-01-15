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

appControllers.controller('menuCtrl', function($scope) {

});

appControllers.controller('dishCtrl', function($scope) {

});

appControllers.controller('reservationCtrl', function($scope) {

});

appControllers.controller('contactCtrl', function($scope) {

});
