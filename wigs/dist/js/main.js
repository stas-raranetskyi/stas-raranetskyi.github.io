$(document).ready(function(){

	var jBody = $('body'),
		container = $('.container'),
		background = $('.background-wrap'),
		bInner = $('.background-inner');

	var show = true;
	function jHover($el,e,move){

		if(!background.length || $(e.target).closest('.popups').length){
			return;
		}
		if(typeof move == 'undefined'){
			move = true;
		}

		var pos = $el.offset(),
			elem_left = pos.left,
			elem_top = pos.top,
			Xinner = e.pageX - elem_left,
			Yinner = e.pageY - elem_top,
			w = container.width(),
			h = container.height(),
			oldActive = $('.background-inner.active').index(),
			active;

		if(move){

			/* 1 line */
			if(Xinner <= w / 3 && Yinner <= h / 3){
				active = 0;
			}else if(Xinner > w / 3 && Xinner < w / 3 * 2 && Yinner <= h / 3){
				active = 1;
			}else if(Xinner > w / 3 * 2 && Xinner < w && Yinner <= h / 3){
				active = 2;
			}
			/* 2 line */
			else if(Xinner <= w / 3 && Yinner >= h / 3 && Yinner <= h / 3 * 2){
				active = 3;
			}else if(Xinner > w / 3 && Xinner < w / 3 * 2 && Yinner >= h / 3 && Yinner <= h / 3 * 2){
				active = 4;
			}else if(Xinner > w / 3 * 2 && Xinner < w && Yinner >= h / 3 && Yinner <= h / 3 * 2){
				active = 5;
			}
			/* 3 line */
			else if(Xinner <= w / 3 && Yinner >= h / 3 * 2 && Yinner <= h){
				active = 6;
			}else if(Xinner > w / 3 && Xinner < w / 3 * 2 && Yinner >= h / 3 * 2 && Yinner <= h){
				active = 7;
			}else if(Xinner > w / 3 * 2 && Xinner < w && Yinner >= h / 3 * 2 && Yinner <= h){
				active = 8;
			}

		}else{
			active = 4;
		}

		if(active != oldActive && show){
			bInner.eq(active).addClass('active');
			show = false;
			setTimeout(function(){
				bInner.each(function(){
					if($(this).index() != active){
						$(this).removeClass('active');
					}
				});
				show = true;
			},200);
		}

	}

	container.on('mousemove mouseover mouseenter',function(e){

		jHover($(this),e);

	});

	$('.phones-header-city').on('click',function(){

		var that = $(this),
			item = $('.phones-header-city-item:not(.active)'),
			active = $('.phones-header-city-item.active'),
			city = item.data('city');

		that.html(city);
		item.addClass('active')
		active.removeClass('active');

		return false;
	})

	$('.phones-header-city-item > a').on('click',function(){

		var that = $(this);
		that.closest('div').toggleClass('open').find('ul').slideToggle();

		return false;
	});

	$('.custom-lnk').on('click',function(){
		var that = $(this),
			href = that.data('href');
		if(href){
			document.location.href = href;
		}

		return false
	})

	function initSlimScroll(el){

		if(typeof el == 'undefined'){
			el = $('.slim-scroll');
		}
		else{
			el = el.find('.slim-scroll');
		}

		if(!el.closest('.popup-item').is(':visible')){
			return false;
		}

		el.parent().replaceWith(el);

		el.each(function(){

			var that = $(this),
				wrap = that.closest('.slim-scroll-wrap'),
				p = that.find('p,h2'),
				body = that.closest('.popup-body')
				title = body.find('.popup-title'),
				h = 0,
				i = 0;

			p.each(function(){
				var that_  = $(this);
				h += that_.height() + parseInt(that_.css('margin-top'));

			});

			if(wrap.height() < that.height()){

				that.slimScroll({
				    height: 'auto',
				    size: '1px',
				    position: 'right',
				    color: '#505050d',
				    alwaysVisible: true,
				    distance: '20px',
				    railVisible: true,
				    railColor: '#222',
				    railOpacity: 1,
				    wheelStep: 200,
				    allowPageScroll: false,
				    disableFadeOut: false
				});
			}

		});
		
	}

	/*function gallerySliderInit(w){

		if(!slider.length){
			return false;
		}

		if(slider.data('api')){
            slider.data('api').destroySlider();
            slider.data('api',null);                
        }

        var slideWidth = 643;

        if(w < 1280){
            slideWidth = 450;
        }

        if(w > 1000){

            var sliderApi = slider.bxSlider({
                minSlides: 2,
                maxSlides: 2,
                slideWidth: slideWidth,
                slideMargin: 30,
            });

            slider.data('api',sliderApi);

        }
        else{
            if(slider.data('api')){
                slider.data('api').destroySlider();
                slider.data('api',null);                
            }
        }

	}


    var w_width = $(window).width();
    gallerySliderInit(w_width);

    $(window).resize(function(){

        var w_width = $(window).width();
        gallerySliderInit(w_width);

    });*/

	function initBXSlider(selector,option){

		var slider = $(selector);

		if(!slider.length){
			return false;
		}

		if(slider.data('api')){
            slider.data('api').destroySlider();
            slider.data('api',null);                
        }

        var w_width = $(window).width();

        if(w_width > 2250){
        	option.minSlides = 5;
        	option.maxSlides = 5;
        }
        else if(w_width <= 2250 && w_width > 1500){
        	option.minSlides = 4;
        	option.maxSlides = 4;
        }
        else if(w_width <= 1300 && w_width > 1200){
        	option.slideWidth = 300;
        }
        else if(w_width <= 1200 && w_width > 1050){
        	option.slideWidth = 280;
        }
        else if(w_width <= 1050 && w_width > 900){
        	option.slideWidth = 230;
        }
        else if(w_width <= 900 && w_width > 850){
        	option.minSlides = 2;
        	option.maxSlides = 2;
        }
        else if(w_width < 850){
        	option.minSlides = 1;
        	option.maxSlides = 1;
        	option.pager = true;
        }

        if(option.minSlides > 1){
        	option.slideMargin = (slider.closest('.related-products-slider').width() - (option.slideWidth * option.minSlides)) / (option.minSlides - 1);
        }

		sliderApi = $(selector).bxSlider(option);
		slider.data('api', sliderApi);

	}

	initBXSlider('.related-products-slider ul',{
        minSlides: 3,
        maxSlides: 3,
        slideWidth: 345,
        pager: false,
        slideMargin: 70,		
	})

	if(isApple()){
		$('.popups').css('max-height',$(window).height());
	}

	$(window).resize(function(){

		initBXSlider('.related-products-slider ul',{
	        minSlides: 3,
	        maxSlides: 3,
	        slideWidth: 345,
	        pager: false,
	        slideMargin: 70,		
		})
		initSlimScroll();

		contactsAdapt($('#contacts'));

		if(isApple()){
			$('.popups').css('max-height',$(window).height());
		}

	});

	function contactsAdapt(el){

		if(!el.is(':visible')){
			return false;
		}
		
		if(!isMobile()){
			setTimeout(function(){
				el.css('padding-bottom',el.find('.map-wrap:visible').height());
			},0)
			
		}
		else{
			el.css('padding-bottom','')
		}

	}

	if(isMobile()){
		$('.trigger-open-menu').on('click',function(){

			$('.container,html,body').scrollTop(0);
			setTimeout(function(){
				$('.burger').trigger('click');
			},0);
			return false;
		});
	}


	$('.open-popup').on('click',function(){

		var that = $(this),
			popup = $(that.attr('href'));

		$('.popups').data('prev-opened',$('.popup-item:visible').attr('id'));

		if(popup.hasClass('popup-item-inner')){
			$('.popup-item').hide();
			popup.fadeIn();			
		}
		else{
			jBody.addClass('opened-popup');
			popup.show();

			if(popup.find('.slim-scroll').length && !isMobile()){
				initSlimScroll(popup);
			}
			if(popup.find('.wrap-map') && !isMobile()){
				contactsAdapt(popup);
				initMap('map1');
			}
		}



		return false;

	});

	$('.popup-close,.overlay,.back-popup').on('click',function(){

		var that = $(this),
			popup = $('.popup-item');

		if(popup.hasClass('popup-item-order')){
			setTimeout(function(){
				$('.burger').trigger('click');
			},0);			
		}

		if($('.popup-item-inner:visible').length){
			$('#' + $('.popups').data('prev-opened')).show();
			//$('.popup-item').show();
			$('.popup-item-inner:visible').fadeOut();
		}
		else{
			jBody.removeClass('opened-popup');

			setTimeout(function(){
				popup.hide();
			},500);
		}

		return false;

	});

	jBody.on('click','.toggle-city-popup a', function(){

		var index = $(this).index();

		$(this).closest('div').find('span').replaceWith(function(index, oldHTML){
		  return $("<a>").attr('href','#').html(oldHTML);
		});

		$(this).replaceWith(function(index, oldHTML){
		  return $("<span>").html(oldHTML);
		});

		$('.city-wrap-contact-item').removeClass('active').eq(index).addClass('active');

		if(!isMobile()){
			$('.city-wrap-contact-item').eq(index).find('.map-wrap > div').empty();

			initMap('map' + (index + 1));
		}

		return false;
	});

	if($(".gallery-slider").length && isMobile()){
		$(".gallery-slider").swipe( {
			swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
				if(isMobile()){
					if(direction == 'left'){
						$(".gallery-slider").find('.next').trigger('click');
					}
					else if(direction == 'right'){
						$(".gallery-slider").find('.prev').trigger('click');					
					}
				}
			}
		});
	}


	/*mobile*/

	var scrollTopPos;
	$('.burger').on('click',function(){

		if(!jBody.hasClass('menu-opened')){
			scrollTopPos = $(window).scrollTop();
			$(window).scrollTop(0)
			jBody.addClass('menu-opened');
		}else{
			jBody.removeClass('menu-opened');
			$(window).scrollTop(scrollTopPos)
		}
		return false;

	});

	$('.slide-index-mobile-item').on('click',function(e){

		var that = $(this),
			href = that.attr('href');

		$('.slide-index-mobile-item').addClass('hover');
		that.addClass('active').removeClass('hover');

		e.preventDefault();

		setTimeout(function(){
			document.location.href = href;
			if(href == '#'){
				location.reload(true);
			}
		},1000)

	});

	/*$.fn.is_on_screen = function(){    
		var win = $(window);
		var viewport = {
			top : win.scrollTop(),
			left : win.scrollLeft()
		};

		var diff = 3;
		if($(this).hasClass('first')){
			diff = 1;
		}

		//viewport.right = viewport.left + win.width();
		viewport.bottom = viewport.top + win.height();

		var bounds = this.offset();
		//bounds.right = bounds.left + this.outerWidth();
		bounds.bottom = bounds.top + this.outerHeight();

		return (!(viewport.bottom - $(this).height() - 20 < bounds.top || viewport.top > bounds.bottom - $(this).height() - 20));
	};

	firstPosScroll = [];
	windowH = $(window).height();

	getPosScroll();

	function parallax() {

		var scrolled = $(window).scrollTop();
		$('.parallax-section').each(function(i,v){ 

			var section = $(this);

			if (section.is_on_screen()) {
				var firstTop = $(this).offset().top; 
				var parallaxItem = $(this).find(".js-parallax");
				console.log(firstPosScroll[i]);
				parallaxItem.each(function(){

					var that = $(this),
						speed = that.data('speed'),
						moveTop = (winScrollTop - firstTop) * speed;

					that.css("top",moveTop + "px");

				})
			}

		});
	}

	winScrollTop = $(this).scrollTop();
	parallax();

	$(window).resize(function(){
		getPosScroll();
	})

	$(window).scroll(function(e){
		winScrollTop = $(this).scrollTop();
		parallax();
	});*/

});

/*$(window).on('beforeunload', function() {
   $(window).scrollTop(0);
});*/

/*function getPosScroll() {
  $('.parallax-section').each(function(i, v) {
    firstPosScroll[i] = $(this).offset().top;
  });
}*/

$(window).load(function(){


	var gallery_slider = $('.gallery-slider ul');
	function initGallerySlider(){
		if (gallery_slider.length){
			if(!isMobile()){
					gallery_slider.anoSlide(
					{
						items: 2,
						speed: 500,
						prev: '.prev[data-prev-paging]',
						next: '.next[data-next-paging]',
						lazy: true,
						onConstruct: function(instance)
						{
							var paging = $('<div/>').addClass('paging');
							
							for (i = 0, l = instance.slides.length - 1; i < l; i++)
							{
								var a = $('<div/>').data('index', i).appendTo(paging).on(
								{
									click: function()
									{
										instance.stop().go($(this).data('index'));
									}
								});
								
								if (i == instance.current)
								{
									a.addClass('current');
									$('.gallery-slider li').eq(i + 1).addClass('current')
								}
							}

							instance.element.parent().append(paging);
							gallery_slider.closest('.gallery-slider').addClass('init');
						},
						onStart: function(ui)
						{
							var paging = $('.paging');
							
							paging.find('div').eq(ui.instance.current).addClass('current').siblings().removeClass('current');
							$('.gallery-slider li').eq(ui.instance.current + 1).addClass('current').siblings().removeClass('current');
						}
					})

			}
			else{
				gallery_slider.anoSlide(
				{
					items: 1,
					speed: 500,
					prev: '.prev[data-prev-paging]',
					next: '.next[data-next-paging]',
					lazy: true,
					onConstruct: function(instance)
					{
						var paging = $('<div/>').addClass('paging');

						for (i = 0, l = instance.slides.length; i < l; i++)
						{
							var a = $('<div/>').data('index', i).appendTo(paging).on(
							{
								click: function()
								{
									instance.stop().go($(this).data('index'));
								}
							});
							
							if (i == instance.current)
							{
								a.addClass('current');
							}
						}

						instance.element.parent().append(paging);
						gallery_slider.closest('.gallery-slider').addClass('init');
					},
					onStart: function(ui)
					{
						var paging = $('.paging');
						
						paging.find('div').eq(ui.instance.current).addClass('current').siblings().removeClass('current');
					}
				})			
			}
		}
	}

	function resetGallerySlider(){
		gallery_slider.removeAttr('style').removeClass('init');
		gallery_slider.find('li').removeAttr('style');
		$('.paging').remove();
	}

	initGallerySlider();

	$(window).resize(function(){

		var w = $(window).width();

		if(w <= 1200 && w > 768){
			resetGallerySlider();
			initGallerySlider();
		}

	});
})

var map;
function initMap(map) {
	if($('#' + map).length){

		var styledMapType = new google.maps.StyledMapType(
            [
			  {
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#e4ddd3"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.icon",
			    "stylers": [
			      {
			        "visibility": "off"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#4b3b3e"
			      }
			    ]
			  },
			  {
			    "elementType": "labels.text.stroke",
			    "stylers": [
			      {
			        "color": "#fcfbf9"
			      }
			    ]
			  },
			  {
			    "featureType": "administrative.land_parcel",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#bdbdbd"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#d4c8b8"
			      }
			    ]
			  },
			  {
			    "featureType": "poi",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#d5cdbf"
			      }
			    ]
			  },
			  {
			    "featureType": "poi.park",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "road",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#ffffff"
			      }
			    ]
			  },
			  {
			    "featureType": "road.arterial",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#757575"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#ffffff"
			      }
			    ]
			  },
			  {
			    "featureType": "road.highway",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#616161"
			      }
			    ]
			  },
			  {
			    "featureType": "road.local",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.line",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#d4c7b7"
			      }
			    ]
			  },
			  {
			    "featureType": "transit.station",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#eeeeee"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "geometry",
			    "stylers": [
			      {
			        "color": "#c9c9c9"
			      }
			    ]
			  },
			  {
			    "featureType": "water",
			    "elementType": "labels.text.fill",
			    "stylers": [
			      {
			        "color": "#9e9e9e"
			      }
			    ]
			  }
			],
            {name: 'Styled Map'});

		var mapWrap = $('#' + map).closest('.map-wrap'),
			coords = mapWrap.data('coords').split(',');
			myLatLng = {lat: parseFloat(coords[0]), lng: parseFloat(coords[1])};

		map = new google.maps.Map(document.getElementById(map), {
			center: myLatLng,
			zoom: 15,
			mapTypeControl: false,
			scrollwheel:  false,
			mapTypeControlOptions: {
	            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
	                    'styled_map']
	          }
		});

		map.mapTypes.set('styled_map', styledMapType);
        map.setMapTypeId('styled_map');

		/*var marker = new google.maps.Marker({
		    position: myLatLng,
		    map: map,
		    title: ''
		});*/

	}
}

function isMobile()
{
    return window.matchMedia("(max-width: 767px)").matches;
}

function isApple(){
	return (navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i));
}