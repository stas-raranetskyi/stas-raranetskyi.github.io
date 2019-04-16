$(document).ready(function(){

    $(".menu li a").click(function(){
        var block = $($(this).attr("href"));
        if(block.length){
            var top = block.offset().top;
            $("body,html").animate({
                scrollTop: top
            },400);
            return false;
        }
    });


    $(function() {
        $( "#slider-range-max" ).slider({
            range: "max",
            min: 1000,
            max: 100000,
            value: 38000,
            step: 1000,
            slide: function( event, ui ) {
                $( "#amount" ).val( ui.value );
                calc();
            }
        });
        $( "#amount" ).val( $( "#slider-range-max" ).slider( "value" ) );
    });
    $(function() {
        $( "#slider-range-max2" ).slider({
            range: "max",
            min: 1000,
            max: 100000,
            value: 10000,
            step: 1000,
            slide: function( event, ui ) {
                $( "#amount2" ).val( ui.value );
                calc();
            }
        });
        $( "#amount2" ).val( $( "#slider-range-max2" ).slider( "value" ) );
    });

    function calc(par){
    
    amount = document.cl_form.amount.value;
    amount2 = document.cl_form.amount2.value;

    //var summ;
    summ = (Number(amount)*12*0.05) + (Number(amount2)*12*0.01) ;
    if (summ >=72000) {
        summ=72000;
    }
     else{
        $(".goods-container li").removeClass('active-items')
    }
    document.cl_form.summ.value=summ;
    if (summ > 501 && summ < 2000){
        $(".goods-container li:nth-child(1)").addClass('active-items')
    }

 
    if (summ > 2001 && summ < 4000){
        $(".goods-container li:nth-child(2)").addClass('active-items')
    }
    
    if (summ > 4001 && summ < 6000){
        $(".goods-container li:nth-child(3)").addClass('active-items')
    }
    
    if (summ > 6001 && summ < 8000){
        $(".goods-container li:nth-child(4)").addClass('active-items')
    }
  
    if (summ > 8001 && summ < 10000){
        $(".goods-container li:nth-child(5)").addClass('active-items')
    }
   
    if (summ > 10001 && summ < 25000){
        $(".goods-container li:nth-child(6)").addClass('active-items')
    }
   
    if (summ > 25001 && summ < 45000){
        $(".goods-container li:nth-child(7)").addClass('active-items')
    }
   
    if (summ > 45001 && summ < 73000){
        $(".goods-container li:nth-child(8)").addClass('active-items')
    }
  

    
    return false; 
    };

   $('.jClever-form select').styler();

   $.fancybox.open({
    type: 'inline',
    href: '#popup', 
    padding:'0',
    helpers : {
        overlay : {
            css : {
                'background' : 'rgba(255, 255, 255, 0.5)'
            }
        }
    }



})


});