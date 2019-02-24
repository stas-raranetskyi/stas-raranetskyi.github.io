$(document).ready(function(){

	var $body = $('body'),
		$window = $(window);

	$('.burger').on('click',function(){

		$body.toggleClass('menu-opened');
		return false;

	});

	$('.toggle-phone a').on('click',function(){

		$(this).closest('div').toggleClass('opened');
		return false;

	});

	$('.menu-mobile li.parent > a').on('click',function(){

		$(this).closest('li.parent').toggleClass('opened').children('ul').slideToggle();
		return false;

	});

	$('.js-online-store-list ul').bxSlider({
        adaptiveHeight: true,
        width: 280
    });

    $('.we-slider > ul').bxSlider({
        pager: false,
    });

    $('.briefcases-slider > ul').bxSlider({
        pager: false,
    });

    $('.reviews-slider > ul').bxSlider({
        pager: false,
    });

    var dropzone = $('.file');
    var droppedFiles = false;

    dropzone.bind('dragover dragenter', function() {

        $(this).addClass('dragover');
        return false;

    }).bind('drop', function(e) {

        $(this).removeClass('dragover');
        droppedFiles = e.originalEvent.dataTransfer.files;
        $(this).find('input').prop('files', droppedFiles).trigger('change');
        e.preventDefault();

    }).bind('dragleave dragend', function() {

        $(this).removeClass('dragover');

    });

    $(document).on('change', ':file', function() {
	    var input = $(this),
	        label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
	    input.closest('.file').addClass('selected').find('span').text(label);
	});

	var min = 0,
		max = 10000,
		step = 100,
		content_slider = $('.slider-info-block'),
		current_val;

	function handlerSlider(min, max, value){

		var percent = value * 100 / max;

		content_slider.each(function(){
			var that = $(this),
				range = that.data('range');

			if(isMobile() && !that.hasClass('is-mobile')){
				return;
			}
			else if(!isMobile() && that.hasClass('is-mobile') && !that.hasClass('is-desktop')){
				return;
			}

			if(typeof range == 'string'){
				range = range.split('-');
				if(typeof range == 'object' && percent >= range[0] && percent <= range[1] && !that.is(':visible')){
					content_slider.hide();
					that.show();
				}
			}
			else if(percent == range && !that.is(':visible')){
				content_slider.hide();
				that.show();
			}
		});

		if(percent >= 50){
			$('.spiner-slider').addClass('pos-left');
		}
		else{
			$('.spiner-slider').removeClass('pos-left');			
		}

	}

	handlerSlider(min,max,0);

	function parseValue(val){

		var val_returned = val;

		return val_returned;

	}

	$("#slider").slider({
		min: min,
		max: max,
		step: step,
		slide: function(event,ui){
			$('.price-value span').text(parseValue(ui.value));
			handlerSlider(min, max, ui.value);
			current_val = ui.value;
		}
	});

	$(".open-video a").fancybox({
		'transitionIn'	: 'none',
		'transitionOut'	: 'none'
	});

	var controller,
		scene;

	function getCookie(name) {
		var matches = document.cookie.match(new RegExp(
			"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
		));
		return matches ? decodeURIComponent(matches[1]) : undefined;
	}

	function setCookie(name, value, options) {
	  options = options || {};

	  var expires = options.expires;

	  if (typeof expires == "number" && expires) {
	    var d = new Date();
	    d.setTime(d.getTime() + expires * 1000);
	    expires = options.expires = d;
	  }
	  if (expires && expires.toUTCString) {
	    options.expires = expires.toUTCString();
	  }

	  value = encodeURIComponent(value);

	  var updatedCookie = name + "=" + value;

	  for (var propName in options) {
	    updatedCookie += "; " + propName;
	    var propValue = options[propName];
	    if (propValue !== true) {
	      updatedCookie += "=" + propValue;
	    }
	  }

	  document.cookie = updatedCookie;
	}

	function deleteCookie(name) {
	  setCookie(name, "", {
	    expires: -1
	  })
	}

	if(getCookie('posScroll')){
		$(window).scrollTop(getCookie('posScroll'));
		deleteCookie('posScroll')
	}

	var time = 0;

	$window.resize(function(e){
		
		handlerSlider(min, max, current_val);

		if(e.timeStamp - time > 300){
	    	if(typeof controller != 'undefined' && $(window).width() > 1000){
				/*if($('.about').offset().top < $(window).scrollTop() && $('.about').offset().top + $('.about').innerHeight() > $(window).scrollTop()){
				}*/
				setCookie('posScroll',$(window).scrollTop());
				location.reload();
	    	}

		}
		time = e.timeStamp;

	});

	var winWidth = $(window).width();

	function setScrollMagic(){

	    if ( $(window).width() > 1000) {

	        controller = new ScrollMagic.Controller();

	        new ScrollMagic.Scene({triggerElement: "#trigger", duration: 785, offset: 0}).setPin("#point").addTo(controller);

	        var durationTigger3 = 2290;
	        var durationLaptop = 1810;

	        if(winWidth < 1280){
	        	durationLaptop += 100;
	        }

	        var tween  = TweenMax.to("#point img", 0.9, {left: -$('.about-scheme').width(), ease: Linear.easeNone}),
	            tween2 = TweenMax.to("#point img", 0.9, {left: 0, ease: Linear.easeNone});
	        
	        new ScrollMagic.Scene({triggerElement: "#trigger-2", offset:1, duration: 1}).removePin("#point").setTween(tween).addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#trigger-3", offset:30, duration: durationTigger3}).setPin("#point").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#trigger-4", offset:1,  duration: 2}).setPin("#point").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#trigger-5", offset:1,  duration: 2}).removePin("#point").setTween(tween2).addTo(controller);

	        var offsetWB = 25;
	        new ScrollMagic.Scene({triggerElement: "#scheme-1", offset:offsetWB, duration:300}).setClassToggle("#scheme-1", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-2", offset:offsetWB, duration:300}).setClassToggle("#scheme-2", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-3", offset:offsetWB, duration:300}).setClassToggle("#scheme-3", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-4", offset:offsetWB, duration:300}).setClassToggle("#scheme-4", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-5", offset:offsetWB, duration:300}).setClassToggle("#scheme-5", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-6", offset:offsetWB, duration:300}).setClassToggle("#scheme-6", "active").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: "#scheme-7", offset:offsetWB, duration:300}).setClassToggle("#scheme-7", "active").addTo(controller);

	        new ScrollMagic.Scene({triggerElement: ".laptop-slide", duration: durationLaptop, offset: 230}).setPin(".laptop-slide").addTo(controller);                     
	        
	        var offsetLT = 25;
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-1", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-1").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-2", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-2").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-3", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-3").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-4", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-4").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-5", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-5").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-6", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-6").addTo(controller);
	        new ScrollMagic.Scene({triggerElement: ".scheme-item-7", offset:offsetLT, duration:300}).setClassToggle(".laptop-slide", "slide-7").addTo(controller);     

	    }
	}

	setScrollMagic();


});

$(window).load(function(){

	$('.masonry').addClass('show').masonry({
		itemSelector: '.portfolio-item',
		columnWidth: 300,
		fitWidth: true,
		gutter: 20
	}).addClass('show');

});


function isMobile()
{
    return window.matchMedia("(max-width: 1000px)").matches;
}

	
var elem = document.getElementById('we-do-desk-items');

if (elem.addEventListener) {
	if ('onwheel' in document) {
	// IE9+, FF17+
	elem.addEventListener("wheel", onWheel);
} else if ('onmousewheel' in document) {
// устаревший вариант события
	elem.addEventListener("mousewheel", onWheel);
} else {
// Firefox < 17
	elem.addEventListener("MozMousePixelScroll", onWheel);
}
} else { // IE8-
	elem.attachEvent("onmousewheel", onWheel);
}

// Это решение предусматривает поддержку IE8-
function onWheel(e) {
	e = e || window.event;

	// deltaY, detail содержат пиксели
	// wheelDelta не дает возможность узнать количество пикселей
	// onwheel || MozMousePixelScroll || onmousewheel
	var delta = e.deltaY || e.detail || e.wheelDelta;

	moveWhel(delta,e);

	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
}

$('.we-do-desk-item li[data-index=' + $('.we-do-desk-items ul li.active').data('content-index') + ']').addClass('active');

var timeStamp = 0;

function moveWhel(delta,event){

	if(typeof event != 'undefined' && event.timeStamp - timeStamp < 300){
		return false;
	}
	timeStamp = event.timeStamp;

	var elm = $('.we-do-desk-items ul'),
		active = elm.find('li.active');
	if(delta < 0 || delta == 'down'){
		var prev = active.prev(),
			last = elm.find('li:last-child');
		active.removeClass('active').addClass('four');
		prev.attr('class','active');
		last.prependTo(elm);
		active = prev;
	}
	else if(delta > 0 || delta == 'up'){
		var next = active.next(),
			first = elm.find('li:first-child');
		active.removeClass('active').addClass('four');
		next.attr('class','active');
		first.appendTo(elm);
		active = next;
	}

	index = active.index();
	$('.we-do-desk-item > ul li').removeClass('active');
	$('.we-do-desk-item > ul li[data-index=' + active.data('content-index') + ']').addClass('active');
	elm.find('li:eq(' + (index - 1) + ')').attr('class','four');
	elm.find('li:eq(' + (index - 2) + ')').attr('class','tree');
	elm.find('li:eq(' + (index - 3) + ')').attr('class','two');
	elm.find('li:eq(' + (index - 4) + ')').attr('class','one');
	elm.find('li:eq(' + (index + 1) + ')').attr('class','four');
	elm.find('li:eq(' + (index + 2) + ')').attr('class','tree');
	elm.find('li:eq(' + (index + 3) + ')').attr('class','two');
	elm.find('li:eq(' + (index + 4) + ')').attr('class','one');

}


$("#we-do-desk-items").swipe( {
	swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
		moveWhel(direction,event);
	}
});