$(document).ready(function(){

	var $jBody = $('body');

	$('.burger').click(function(){

		$jBody.toggleClass('menu-opened');

		if($jBody.hasClass('menu-opened')){
			$('.menu-header').css({'top':$('.header').height()});
		}

		return false;

	});

	$('.menu-header > li.parent a').click(function(){

		if($jBody.hasClass('menu-opened')){
			var that = $(this);
				that.closest('li').find('ul').slideToggle();
				return false;
		}

	});

	if(jQuery('.jClever').length){
		var cleverAPI = jQuery('.jClever').jClever(
	    {
	        applyTo: {
	            select: true,
	            checkbox: false,
	            radio: false,
	            button: false,
	            file: false,
	            input: false,
	            textarea: false
	        }
	    });

	}

	if($('.js-slider-main').length){
		$('.js-slider-main > ul').bxSlider({
			'pager': false,
		});
	}

	var listBannersCountrys = null;

	function initListBannersCountrys(){

		if(isMobile()){
			if($('.list-banners-countrys').length){
				listBannersCountrys = $('.list-banners-countrys > ul').bxSlider({
					'pager': false,
					'minSlides': 3,
					'maxSlides': 4,
					'responsive': true,
					'slideWidth': 500
				});
			}		
		}

	}

	function destroyListBannersCountrys(){
		if(listBannersCountrys != null){
			listBannersCountrys.destroySlider();
			listBannersCountrys = null;
			$('.list-banners-countrys > ul').removeAttr('style').find('li').removeAttr('style');
		}
	}

	initListBannersCountrys();

	if($('.fancybox').length){
		$(".fancybox").fancybox({
			'padding': 0,
			'wrapCSS': 'fancybox-custom'
		});
	}

	$('.js-accordion-control').on('click',function(){

		var that = $(this),
			parent = that.closest('.accordion-item');

		parent.toggleClass('active');
		if(parent.hasClass('active')){
			parent.find('.accordion-hide').slideDown();
			$('.accordion-item').not(parent).removeClass('active');
		}
		$('.accordion-item').not('.active').find('.accordion-hide').slideUp();

		if($('.js-tab-content').length){
			to($('.js-tab-content'),100);
		}
		else{
			to($('.accordion-wrap'),100);			
		}

		return false;

	});

	function to($el,difference){

        var top = $el.offset().top - difference;
        $('html,body').animate({scrollTop: top}, 1000);

    }

	$('.js-tab-nav li a').click(function(){

		var that = $(this).closest('li'),
			index = that.index(),
			tabContent = $('.js-tab-content > li');

		$('.js-tab-nav li,.js-tab-content > li').removeClass('active');
		that.addClass('active');
		tabContent.eq(index).addClass('active');

		return false;

	});

	var licensesAndCertificatesApi = null,
		licensesAndCertificatesWidth = $('.licenses-and-certificates').width();

	function licensesAndCertificatesInit(width,update){

		if(typeof update == 'undefined'){
			update = false;
		}

		setTimeout(function(){

			var count = 5;

			if(update && licensesAndCertificatesApi != null){

				licensesAndCertificatesApi.destroySlider();
				licensesAndCertificatesApi = null;

			}

			if(width <= 1280 && width > 900){
				count = 4;
			}
			else if(width <= 900 && width > 640){
				count = 3
			}
			else if(width <= 640 && width > 480){
				count = 2;
			}
			else if(width <= 480){
				count = 1;
			}
			else{
				count = 5;
			}


			if($('.licenses-and-certificates').length){

				if(licensesAndCertificatesApi == null){

						licensesAndCertificatesApi = $('.licenses-and-certificates > ul').bxSlider({
							'minSlides': 1,
							'maxSlides': 5,
							'responsive': true,
							'slideWidth': parseInt(width / count)
						});
					
				}

			}

		},100)
		
	}

	licensesAndCertificatesInit(licensesAndCertificatesWidth);


	$('.map-country').on('mousemove mouseenter',function(e){

		var that = $(this),
			tooltip = $('.education-tooltip'),
			title = $('.education-tooltip-title'),
			tBody = $('.education-tooltip-body'),
			wrap = $('.education-map'),
			ojbCountry = that.data('info'),
			pathToFolderFlags = 'images/flags/',
			flag = ojbCountry.flag + '.jpg',
			src = pathToFolderFlags + flag,
			offset = wrap.offset(),
			relativeX = (e.pageX - offset.left),
			relativeY = (e.pageY - offset.top),
			tooltipWidth,
			wWidth = wrap.width();

		if(tooltip.css('display') != 'block'){
			tooltip.show()
		}

		title.find('img').attr('src',src);
		title.find('span').text(ojbCountry.name);
		tBody.empty();
		ojbCountry.info.forEach(function(item, i, arr) {
			var span = $('<span/>');
			span.text(item);
			tBody.append(span);
		});

		tooltipWidth = tooltip.outerWidth();
		if(relativeX + tooltipWidth >= wWidth - 10){
			left = wWidth - tooltipWidth - 20;
		}
		else{
			left = relativeX;
		}
		tooltip.css({'top':relativeY + 10,'left':left + 10});

	});

	$('.map-country').on('mouseleave',function(e){

		var that = $(this),
			tooltip = $('.education-tooltip'),
			title = $('.education-tooltip-title'),
			tBody = $('.education-tooltip-body');

		tBody.empty();
		tooltip.hide();

	});

	$('.map-country').on('click',function(e){

		var that = $(this),
			href = that.data('href');

		document.location.href = href;

		return false;

	});

	function isChecked($el){
		if($el.is(':checked')){
			$el.closest('.filter-checkbox').addClass('checked');
		}
		else{
			$el.closest('.filter-checkbox').removeClass('checked');			
		}
	}

	$('.filter-checkbox input').each(function(){

		var that = $(this);
		isChecked(that);

	});

	$('.filter-checkbox input').on('change',function(){

		var that = $(this);
		isChecked(that);

	});

	if($('.phone').length) {
        $(".phone").inputmask("+7 (999) 999-99-99");
    }

    if($('.email').length) {
   
       $(".email").inputmask({
            mask: "*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]",
            greedy: false,
            onBeforePaste: function (pastedValue, opts) {
              pastedValue = pastedValue.toLowerCase();
              return pastedValue.replace("mailto:", "");
            },
            definitions: {
              '*': {
                validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~\-]",
                cardinality: 1,
                casing: "lower"
              }
            }
        });
    }

    $(".datepicker").datepicker({
    	monthNames: ['Январь', 'Февраль', 'Март', 'Апрель',
		'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
		'Октябрь', 'Ноябрь', 'Декабрь'],
		 dayNamesMin: ['Вс','Пн','Вт','Ср','Чт','Пт','Сб'],
		 firstDay: 1,
    });



	if($('.info-hotel-big-slider').length){


		function initItemSliderNav(){

			var nav = $('.js-info-hotel-small-slider');
			if(nav.data('api')){
				nav.data('api').destroySlider();
			}
			setTimeout(function(){
				var max_height = $('.info-hotel-small-slider').height();
				var max_width = $('.info-hotel-small-slider').width();
				var nav_width = 0;
				$('.info-hotel-small-slider a').each(function(){
					nav_width += $(this).width() + 17;
				});
				var mode = 'vertical';
				var count = 0;
				var mob = window.matchMedia("(max-width: 768px)").matches;
				if(mob){
					mode = 'horizontal';
				}
				if(mode == 'vertical'){
					if(nav.height() > max_height){
						count = Math.floor((max_height - 20) / (83 + 17));
					}
				}
				else if(mode == 'horizontal'){
					if(nav_width > max_width){
						count = Math.floor((max_width - 20) / (115 + 17));
					}
				}
				if(count){
					var navApi = nav.bxSlider({
						minSlides: count,
						maxSlides: count,
						moveSlides: 1,
						slideWidth: 115,
						slideMargin: 17,
						autoStart: false,
						adaptiveHeight: false,
						responsive: true,
						startSlide: 0,
						infiniteLoop: true,
						pager: false,
						mode: mode
					});
					nav.data('api',navApi);
				}
			},10);
			
		}
		

		function initItemSlider(){

			var slider = $('.js-info-hotel-big-slider');
			if(slider.data('api')){
				slider.data('api').destroySlider();
			}
			setTimeout(function(){
				var sliderApi = slider.bxSlider({
					pager: false,
					onSliderLoad: function(){
						initItemSliderNav();
					}
				});
				slider.data('api',sliderApi);
			},10);


		}

		initItemSlider();

		$('.js-info-hotel-small-slider-pager-item').on('click',function(){

			var that = $(this),
				index = that.data('slide-index'),
				slider = $('.js-info-hotel-big-slider');

			if(slider.data('api')){
				slider.data('api').goToSlide(index);
			}

			return false;

		});
	}

	$(window).resize(function(){

		licensesAndCertificatesWidth = $('.licenses-and-certificates').width();

		if($jBody.hasClass('menu-opened')){
			$('.menu-header').css({'top':$('.header').height()});
		}

		if(!isMobile()){
			destroyListBannersCountrys();
			$jBody.removeClass('menu-opened');
		}

		licensesAndCertificatesInit(licensesAndCertificatesWidth,true);

		if(listBannersCountrys == null){
			initListBannersCountrys();
		}

		if($('.info-hotel-big-slider').length){
			initItemSlider();
		}

	});

	

});

$(window).load(function(){

	$('.block-opacity,.jClever,.slider-main,.info-hotel-slider,.list-banners').each(function(){

		var that = $(this);
		that.addClass('show');

	})

	if($('.filter-select-countries').length){

		var itemsFilterSelectCountrie = $('.filter-select-countries');

		itemsFilterSelectCountrie.each(function(){

			var that = $(this),
				center = that.find('.jClever-element-select-center'),
				select = that.find('select'),
				items = that.find('.jClever-element-select-list li');

			items.each(function(){
				var that_ = $(this),
					img = $('<img/>');

				imgSrc = that_.data('flag');

				img.attr({
					'src': imgSrc,
					'class': 'flag-middle'
				});

				if(that_.hasClass('active')){
					var imgCopy = img.clone();
					center.prepend(imgCopy);
				}

				that_.prepend(img);

			});

			select.on('change',function(){

				items.each(function(){
					var that_ = $(this),
						img = $('<img/>');

					imgSrc = that_.data('flag');

					img.attr({
						'src': imgSrc,
						'class': 'flag-middle'
					});

					if(that_.hasClass('active')){
						var imgCopy = img.clone();
						center.prepend(imgCopy);
					}

				});

			})

		});

	}

});

var map;
function initMap() {
	if($('.map-wrap').length){

		var mapWrap = $('.map-wrap'),
			coords = mapWrap.data('coords').split(',');
			contacts = mapWrap.data('contacts');
			myLatLng = {lat: parseFloat(coords[0]), lng: parseFloat(coords[1])};

		map = new google.maps.Map(document.getElementById('map'), {
			center: myLatLng,
			zoom: 16,
			mapTypeControl: false,
			scrollwheel:  false
		});

		if(!contacts){
			var marker = new google.maps.Marker({
			    position: myLatLng,
			    map: map,
			    title: ''
			});
		}
		else{

			var directionsDisplay = new google.maps.DirectionsRenderer(),
				directionsService = new google.maps.DirectionsService();

		    var request = {
		        origin: new google.maps.LatLng(55.766209,37.636386),		// start
		        destination: new google.maps.LatLng(coords[0],coords[1]),	// finish
		        travelMode: google.maps.DirectionsTravelMode.DRIVING
		    };

		    directionsService.route(request, function(response, status) {
		        if (status == google.maps.DirectionsStatus.OK) {
		            directionsDisplay.setDirections(response);
		        }
		    });

		    directionsDisplay.setMap(map);

		    var latlng = new google.maps.LatLng(55.766556, 37.623988);
		    map.setCenter(latlng);

		}

	}
}

$(window).resize(function(){
	if(map){
		google.maps.event.trigger(map, 'resize');
	}
})

function isMobile()
{
    return window.matchMedia("(max-width: 900px)").matches;
}