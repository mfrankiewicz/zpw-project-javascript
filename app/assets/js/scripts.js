$(document).ready(function() {
    $('html').niceScroll({
        cursorcolor: "#e1e1e1",
        cursorborder: "5px solid #545454",
        zindex: 16
    });
    $('#browsing-progress').progressBar();
    $('nav').navigation();

    $(document).hover(function(){
        /**
         * fix bootstrap carousel indicators (angular routing conflict)
         */
        $('a[data-slide]').on('click', function(event) {
            event.preventDefault();
        });
        $('i[data-rating-star]').hover(function() {
            $(this).prevAll().css("opacity", "1");
            $(this).css("opacity", "1");
        }, function() {
            $(this).siblings().css("opacity", ".5");
            $(this).css("opacity", ".5");
        });
    });

    $('body').css("visibility", "visible");
});
