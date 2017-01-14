$(document).ready(function() {
    $("html").niceScroll({
        cursorcolor: "#e1e1e1",
        cursorborder: "5px solid #c1c1c1"
    });

    if ($('#browsing-progress').length) {
        $(document).on('scroll', function(){
            $('#browsing-progress').attr('max', $(document).height() - $(window).height());
            $('#browsing-progress').attr('value', $(window).scrollTop());
        });
    }

    $('nav ul li a').on('click', function(){
        $('nav ul li').removeClass('active');
        $(this).parent().addClass('active');
    });
});
