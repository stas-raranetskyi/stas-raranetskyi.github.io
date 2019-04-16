


function to(el,difference){

	var $el = $(el);
	if(!$el.length){
		return false;
	}

	if(typeof difference == 'undefined'){
		difference = 0;
	}

	var top = $el.offset().top - difference;

    $('html,body').animate({scrollTop: top}, 1000);

}

$(document).ready(function(){

	var $body = $('body');

	if(isMobile()){
		$('.calculator-result').css("width",$(window).width());
	}

	$(window).resize(function(){

		if(isMobile()){
			$('.calculator-result').css("width",$(window).width());
		}

	});

    $('.js-to').on('click',function(){

		var that = $(this),
			$to = $(that).data('to');
		to($to);
    	return false;

    });

	$('.line-top-header-phone > a').on('click',function(){

		if(isMobile()){
			$(this).closest('div').find('ul').slideToggle();
		}
		return false;

	});

	function closePhones(e){

		if(isMobile()){
			var container = $('.line-top-header-phone');
		    if (container.has(e.target).length === 0){
		        container.find('ul').slideUp();
		    }
		}

	}

	$('.line-top-header-phone ul a').on('click',function(){

		if(!isMobile()){
			return false;
		}

	})

	$('.burger').on('click',function(){

		$body.toggleClass('menu-opened');
		return false;

	});

	$('.menu-mobile a').on('click',function(){
		var that = $(this),
			to_elm = that.data('to');
		if($(to_elm).length){
			$body.removeClass('menu-opened');
			setTimeout(function(){

				to(to_elm);

			},300)
			return false;
		}
	})

	$('.main-slider').on('mousemove mouseenter',function(e){

		if($(window).width() > 1000){

			var offset = $(this).offset(),
				w = $(this).width(),
				relativeX = (e.pageX - offset.left);

			$('.main-slider-image-after').width(w - relativeX);
			
		}

	});

	$('.j-tab-nav a').on('click',function(){

		var that = $(this),
			$track_tab = $('.tab-content[data-id="' + that.data('track') + '"]'),
			index = that.closest('li').index();

		that.closest('.j-tab-nav').find('li').removeClass('active').eq(index).addClass('active');

		if(!that.closest('.tab-content').length){
			$track_tab.children('.tab-content-item').removeClass('active').eq(index).addClass('active');
		}
		else{
			that.closest('.tab-content-item').find($track_tab).children('.tab-content-item').removeClass('active').eq(index).addClass('active');
		}

		return false;

	});

	function swipeTab(dir){

		var index = $('.how-work-tab-nav .j-tab-nav li.active').index(),
			len = $('.how-work-tab-nav .j-tab-nav li').length - 1;

		if(dir == 'left'){
			++index;
		}
		else{
			--index;
		}
		if(index < 0){
			index = len;
		}
		else if(index > len){
			index = 0;
		}

		$('.tab-how-work .tab-content-item').removeClass('active').eq(index).addClass('active');
		$('.how-work-tab-nav .j-tab-nav li').removeClass('active').eq(index).addClass('active');
		
		return true;

	};

	$(".tab-how-work .tab-content-item .how-work-tab-content").each(function(){

		var that = $(this);

		new Hammer(that[0], {
			domEvents: true
		});

		$(that).on( "swipeleft", function(e) {
			/*console.log('left');*/
			swipeTab('left');

		});

		$(that).on( "swiperight", function(e) {
			/*console.log('right');*/
			swipeTab('right');
		});

	})

	/*$('.info > a').on('click',function(){

		if(!isMobile()){
			return false;
		}

		var that = $(this),
			$info = that.closest('div.info');

		$info.toggleClass('active');
		if($info.hasClass('active')){
			$info.find('.info-popup').slideDown();
			$('.info').not($info).removeClass('active');
		}
		$('.info').not('.active').find('.info-popup').slideUp();

		return false;

	});*/

	$('.calculator-table-cell:first-child').on('click',function(){

		if(!isMobile()){
			return false;
		}

		var that = $(this),
			$info = that.find('div.info');

		$info.toggleClass('active');
		if($info.hasClass('active')){
			$info.find('.info-popup').slideDown();
			$('.info').not($info).removeClass('active');
		}
		$('.info').not('.active').find('.info-popup').slideUp();

		return false;

	});



	$('.calculator-table-cell:first-child').on('hover',function(){

		if(isMobile()){
			return false;
		}

	});

	$('.container').on("click", function(e){
		closeInfo(e);
		closePhones(e);
	});

	function closeInfo(e){

		var container = $('.calculator-table-cell:first-child');
	    if (container.has(e.target).length === 0){
	        container.find('.info-popup').slideUp();
	        $('.info.active').removeClass('active');
	    }

	}

	$('.text-block-bottom-toggle a').on('click',function(){

		$(this).toggleClass('opened');
		$('.text-block-bottom-content').toggleClass('opened');
		return false;

	});

	function checkCheckbox(checkbox,change){

		var $calculator = checkbox.closest('.calculator'),

			payment = $calculator.find('.calculator-result-data-row-price-payment'),
			connect = $calculator.find('.calculator-result-data-row-price-connect'),

			payment_price = payment.data('price'),
			connect_price = connect.data('price'),

			checkbox_payment_price = checkbox.data('price-payment'),
			checkbox_connectt_price = checkbox.data('price-connect');

		if(typeof change == 'udnefined'){
			change = false;
		}

		if(checkbox.is(':checked')){
			checkbox.closest('.calculator-checkbox').addClass('checked');
			payment_price += checkbox_payment_price;
			connect_price += checkbox_connectt_price;
			payment.data('price',payment_price).find('span').text(payment_price);
			connect.data('price',connect_price).find('span').text(connect_price);

		}else{
			checkbox.closest('.calculator-checkbox').removeClass('checked');
			if(change){
				payment_price -= checkbox_payment_price;
				connect_price -= checkbox_connectt_price;
				payment.data('price',payment_price).find('span').text(payment_price);
				connect.data('price',connect_price).find('span').text(connect_price);
			}
		}
	}

	$('.calculator-checkbox input').each(function(){
		checkCheckbox($(this));		
	})

	$('.calculator-checkbox input').on('change',function(){

		var that = $(this);
		checkCheckbox(that,true);

	});

    $('.contacts-info-form').checkForm({
    	success: function(form){
    		console.log(form.find('.phone'));
    		return false
    	}
    });

    if($('.phone').length) {
        $(".phone").inputmask("+38 (099) 999-99-99");
    }

	$(".fancybox").fancybox({
		'transitionIn'	: 'none',
		'transitionOut'	: 'none',
		'wrapCSS': 'popup-custom'
	});

	var winWidth = $(window).width();

	function setScrollMagic(){

	    if ( isMobile()) {

	        var controller = new ScrollMagic.Controller(),
	        	duration1 = $('.tab-content-main .tab-content-item:first-child .calculator-table').height() - 230,
	        	duration2 = $('.tab-content-main .tab-content-item:nth-child(2) .calculator-table').height() - 230,
	        	duration2 = $('.tab-content-main .tab-content-item:nth-child(3) .calculator-table').height() - 230;
	        
				new ScrollMagic.Scene({triggerElement: "#calculator-table-row-first-1", offset:0, duration:duration1}).setClassToggle("#calculator-result-1", "min").addTo(controller);

		        new ScrollMagic.Scene({triggerElement: "#calculator-table-row-first-2", offset:0, duration:duration1}).setClassToggle("#calculator-result-2", "min").addTo(controller);

		        new ScrollMagic.Scene({triggerElement: "#calculator-table-row-first-3", offset:0, duration:duration1}).setClassToggle("#calculator-result-3", "min").addTo(controller);

	    }
	}

	if($('.tab-content-main').length){
		setScrollMagic();
	}

	window.addEventListener("orientationchange", function() {
	    location.reload(true);
	}, false);

});

$(window).load(function(){


    var params = window
    .location
    .search
    .replace('?','')
    .split('&')
    .reduce(
        function(p,e){
            var a = e.split('=');
            p[ decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
            return p;
        },
        {}
    );

    if(params['to']){
    	to($('#' + params['to']))
    }

});

var map;
function initMap() {
	if($('.contacts-map').length && $(window).width() > 1000){

		var mapWrap = $('.contacts-map'),
			coords = mapWrap.data('coords').split(','),
			myLatLng = {lat: parseFloat(coords[0]), lng: parseFloat(coords[1])};

		map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 19,
			mapTypeControl: false,
			scrollwheel:  false
		});

		var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: ''
		});

	}
}

function isMobile()
{
    return window.matchMedia("(max-width: 1000px)").matches;
}