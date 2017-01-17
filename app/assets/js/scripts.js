$(document).ready(function() {
    $('html').niceScroll({
        cursorcolor: "#e1e1e1",
        cursorborder: "5px solid #545454",
        zindex: 16
    });
    $('#browsing-progress').progressBar();
    $('nav').navigation();

    /**
     * @fixme fix event binding to dynamic content
     */
    $(document).hover(function(){
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
