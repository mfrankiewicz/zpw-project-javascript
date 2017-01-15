$.fn.navigation = function(){
    var _this = this;
    this.navigationElement = null;

    this.moveActiveMark = function(liElement){
        if (liElement == undefined || !liElement.length) {
            liElement = $('li.active', this.navigationElement);
        }
        $('.active-mark', this.navigationElement).width($(liElement).width());
        $('.active-mark', this.navigationElement).css('left', $('a', liElement).position().left + 'px');
    }

    this.navigationClickCallback = function(event){
        $('ul li', _this.navigationElement).removeClass('active');
        $(this).parent().addClass('active');
        _this.moveActiveMark();
    }

    this.navigationHoverInCallback = function(){
        _this.moveActiveMark($(this));
    }

    this.navigationHoverOutCallback = function(){
        _this.moveActiveMark();
    }

    this.init = function(){
        if ($(this.get(0)).length) {
            this.navigationElement = $(this.get(0));
            this.moveActiveMark();
            $('ul li a', this.navigationElement).on('click', this.navigationClickCallback);
            $('li', this.navigationElement).hover(this.navigationHoverInCallback, this.navigationHoverOutCallback);

        }
    }

    this.init();
}

$.fn.progressBar = function(){
    var _this = this;
    this.progressBarElement = null;

    this.documentScrollCallback = function(){
        _this.progressBarElement.attr('max', $(document).height() - $(window).height());
        _this.progressBarElement.attr('value', $(window).scrollTop());
    }

    this.init = function(){
        if ($(this.get(0)).length) {
            this.progressBarElement = $(this.get(0));
            $(document).on('scroll', this.documentScrollCallback);
        }
    }

    this.init();
}
