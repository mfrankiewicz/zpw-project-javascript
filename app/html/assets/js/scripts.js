$(document).ready(function() {
    $('html').niceScroll({
        cursorcolor: "#e1e1e1",
        cursorborder: "5px solid #545454",
        zindex: 16
    });
    $('#browsing-progress').progressBar();
    $('nav').navigation();

    /**
     * fix bootstrap carousel indicators (angular routing conflict)
     */
    $('a[data-slide]').on('click', function(event) {
        event.preventDefault();
    });
});
