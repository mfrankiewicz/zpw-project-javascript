$(document).ready(function() {
    $('html').niceScroll({
        cursorcolor: "#e1e1e1",
        cursorborder: "5px solid #545454",
        zindex: 16
    });
    $('#browsing-progress').progressBar();
    $('nav').navigation();

    $('body').css("visibility", "visible");

    $('nav .open').on('click', function(){
        $('nav ul.mobile').css("top", "30%");
    });

    $('nav ul.mobile .close-bar, nav ul.mobile li a').on('click', function(){
        $('nav ul.mobile').css("top", "-350%");
    });
});
