$(document).on('scroll', function(){
    $('#browsing-progress').attr('max', $(document).height() - $(window).height());
    $('#browsing-progress').attr('value', $(window).scrollTop());
});
