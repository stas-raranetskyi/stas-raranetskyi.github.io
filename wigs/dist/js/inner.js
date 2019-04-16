$(document).ready(function(){
    if ($(".select-form").length) {
        $(".select-form").jClever({
            applyTo: {
                select: true,
                checkbox: false,
                radio: false,
                button: false,
                file: false,
                input: false,
                textarea: false,
                label: false
            }
        });
    }

    if ($(".slider-text").length) {
        $('.slider-text').each(function(){
            
            var sliderApi = $(this).bxSlider({
                minSlides: 1,
                maxSlides: 1
            });
            $(this).data('api',sliderApi);

        })
    }

    $(window).resize(function(){

        if($('.slider-text').length){
            $('.slider-text').each(function(){
                console.log($(this));
                if($(this).data('api')){
                    $(this).data('api').reloadSlider();
                }
            })
        }

    })

    $('.product-block-link').click(function(){
        return false;
    });

    function inWindow(s){
        var scrollTop = $(window).scrollTop();
        var windowHeight = $(window).height();
        var currentEls = $(s);
        var result = [];
        currentEls.each(function(){
            var el = $(this);
            var offset = el.offset();
            if(scrollTop <= offset.top && (el.height()/2 + offset.top) < (scrollTop + windowHeight))
                result.push(this);
        });
        return $(result);
    }

    var boxesInWindow = inWindow("div.product-block");
    boxesInWindow.addClass("boxes-in-window");

    $(window).scroll(function(){
        boxesInWindow = inWindow("div.product-block:not(.boxes-in-window)");
        boxesInWindow.addClass("boxes-in-window");
    });

    $("body").on("click", ".filter-open-button", function(){
        $("body").addClass("opened-filter");
        return false
    });

    $('.close-filter').on('click',function(){
        $("body").removeClass("opened-filter");
        return false
    });

    $(".filters-title").on("click", function(){
        $(this).closest(".filters-block").find(".filters-mobile-wrap").slideToggle();
        $(this).closest(".filters-block").find(".filters-title-arrow").toggleClass("arrow-rotate");
    })


});