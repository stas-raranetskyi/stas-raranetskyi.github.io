$(document).ready(function(){

	var time = 0;

	function initBxSlider(slider,params,e,reload){

		if(typeof e != 'undefined'){

			if(e.timeStamp - time < 300){
				return false;
			}
			time = e.timeStamp;
		}


		slider = $(slider);

		if(reload && slider.data('api')){
            slider.data('api').reloadSlider();
            return;			
		}

        if(slider.data('api')){
            slider.data('api').destroySlider();
            slider.data('api',false);              
        }

        var sliderApi = slider.bxSlider(params);

        slider.data('api',sliderApi);

    }

    $('.burger').on('click',function(e){

    	$('body').toggleClass('menu-opened');

    	e.preventDefault();
    });

    $('.menu .parent > a').on('click',function(){

    	var that = $(this),
    		parent = that.closest('li.parent');

    	parent.find('.dropdown-menu').addClass('opened');

    	return false;
    });

    $('.dropdown-menu-close').on('click',function(){

    	var that = $(this),
    		close = that.data('close');

    	if(close == 'all'){
    		$('.dropdown-menu').removeClass('opened');
    		$('.burger').trigger('click');
    	}
    	else{
    		var ul = that.closest('.dropdown-menu').find('ul.opened');
    		if(ul.length){
    			ul.removeClass('opened');
    			$('.dropdown-menu-title').show();
    		}
    		else{
    			that.closest('.dropdown-menu').removeClass('opened');
    		}
    	}

    	return false
    });

    $('.dropdown-menu-title').on('click',function(){

    	var that = $(this),
    		menu = that.closest('.dropdown-menu-cell').find('ul');

    	menu.addClass('opened');
    	$('.dropdown-menu-title').hide();

    	return false;
    });

	if($('.main-slider').length){
		initBxSlider('.main-slider > ul',{
			pager: false
		})
	}

	$('.js-tab-nav a').on('click',function(){

		var that = $(this),
			elm = $(that.closest('ul').data('elm')),
			index = that.closest('li').index();
		elm.find('.tab-content-item').fadeOut().eq(index).fadeIn();
		that.closest('.js-tab-nav').find('a').removeClass('active');
		that.addClass('active');

		return false;

	});

	$('.search-button a').on('click',function(e){

		$(this).closest('li').toggleClass('opened');

		e.preventDefault();

	});

	function initSliderProducts (option) {
		var slider = $('.list-products-slider > ul');

		var w_width = $(window).width();

		var count = 4;

		if(w_width > 1920){
			count = 5;
		}

		slider.each(function(){
			var that = $(this),
				slider_width = that.width(),
				slide_width = (slider_width - (count) * 10) / count;
			
			option.slideWidth = slide_width;
			option.onSliderLoad = function(){
				that.closest('div.list-products-slider').addClass('load');
			}
			if(that.children('li').length >= count){
				initBxSlider(that,option)
			}

		});
	}

	initSliderProducts({
		pager: false,
		minSlides: 4,
		maxSlides: 4,
		slideMargin: 10,
	});

	$(window).resize(function(e){

		initBxSlider('.main-slider > ul',{
			pager: false
		},e,true)

	});

	if(jQuery('.select-city-header').length){
		var cleverAPI = jQuery('.select-city-header-form').jClever(
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

	$('.menu-inner .parent > a').on('click',function(e){

		var that = $(this),
			parent = that.closest('li.parent'),
			ul = parent.children('ul');
		
		parent.toggleClass('active');
		if(parent.hasClass('active')){
			parent.find('ul').slideDown();
			$('.menu-inner .parent').not(parent).removeClass('active');
		}
		$('.menu-inner .parent').not('.active').find('ul').slideUp();

		e.preventDefault();

	});

	$('.filter-controls .open-dropdown-filter').on('click',function(e){

		var that = $(this),
			parent = that.closest('li'),
			dropdown = parent.find('.dropdown-filter');
		
		parent.toggleClass('active');
		if(parent.hasClass('active')){
			$('.filter-controls li').not(parent).removeClass('active');
		}
		
		e.preventDefault();

	});

	$(document).on('click',function(e){

		var filter = $('.filter-controls');
		if(!$(e.target).closest(filter).length){
			filter.find('.active').removeClass('active');
		}

		var search = $('.search-button');
		if(!$(e.target).closest(search).length){
			search.removeClass('opened');
		}

	});

	$('.checkbox input').on('change',function(){

		var that = $(this);

		if(that.is(':checked')){
			that.closest('.checkbox').addClass('checked');
		}
		else{
			that.closest('.checkbox').removeClass('checked');			
		}

	});

	$('.radio input').on('change',function(){

		var that = $(this),
			name = that.attr('name');


		$('input[name="' + name + '"]').closest('.radio').removeClass('checked');
		
		if(that.is(':checked')){
			that.closest('.radio').addClass('checked');
		}
		else{
			that.closest('.radio').removeClass('checked');			
		}

	});

	if(jQuery('.sort-list-products').length){
		var cleverAPI = jQuery('.sort-list-products form').jClever(
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

	$('.view-controls-list-products-item').on('click',function(){

		$('.view-controls-list-products-item').removeClass('active');
		var that = $(this);
		that.addClass('active');

		if(that.hasClass('list')){
			$('.list-products').addClass('list');
		}
		else{
			$('.list-products').removeClass('list');			
		}

	});

	$('.list-product-item-img-previews a').on('click',function(e){

		var that = $(this),
			src = that.data('src'),
			detail_img = $('.list-product-item-detail');

		detail_img.attr('src',src);

		e.preventDefault();

	});

	$('.list-product-item-controls-icons .favorites').on('click',function(e){

		console.log($(this).closest('ul').closest('li'));
		$(this).closest('.list-product-item-controls-icons').closest('li').find('.favorites').toggleClass('active');
		e.preventDefault();
	});

	
	if($(".js-fast").length){
		$(".js-fast").fancybox({
			'transitionIn'	: 'none',
			'transitionOut'	: 'none'
		});
	}

	if(jQuery('.form-personal').length){
		var cleverAPI = jQuery('.form-personal').jClever(
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

	$('.email-input').inputmask({
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
	  })

});