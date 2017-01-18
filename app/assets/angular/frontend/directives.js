var appDirectives = angular.module('appDirectives',[]);

appDirectives.directive('ratingStar', function() {
    return {
         link: function(scope, element, $attrs) {
             jQuery(element).hover(function() {
                 jQuery(this).prevAll().css("opacity", "1");
                 jQuery(this).css("opacity", "1");
             }, function() {
                 jQuery(this).siblings().css("opacity", ".5");
                 jQuery(this).css("opacity", ".5");
             });



         }
    };
});
