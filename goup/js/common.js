$(document).ready(function(){

	$(".callBack > a").on("click",function(){
        $(".popupCallBack").slideToggle();
        return false;
    });

    $(".noActive").on("click",function(){
        return false;
    });

    $(".phoneNum").inputmask("+3(099) 999-99-99");

    $(".popupCallBack input[type='text']").on("keydown",function(e){
        var str = $(this).val().replace(/\D+/g,"");
        var len = str.length;
        var numberKey = e.keyCode;
        if(len >= 10){
            $(".popupCallBack input[type='submit']").removeClass("noActive");
        }
        if(numberKey == 8){
            if(!$(".popupCallBack input[type='submit']").hasClass("noActive")) {
                $(".popupCallBack input[type='submit']").addClass("noActive");
            }
        }
    });

    $(".popupCallBack input[type='button']").on("click",function(){
        $(".popupCallBack input[type='text']").val("");
        $(".popupCallBack").slideToggle();
    });

    /*$(".listServicesItemIcon").hover(function(){
        $(this).find("img").addClass("pulse");
    },function(){
        $(this).find("img").removeClass("pulse");
    });*/

    if($(".slides").length != 0){
        $('.slides').bxSlider();
    }

    $(".logoFooterIndex a").hover(function(){
        if($(".logoFooterIndexText").width() == 0){
            $(".logoFooterIndexText").animate({"width":"200px"},150);
        }
    },function(){
        if($(".logoFooterIndexText").width() == 200) {
            $(".logoFooterIndexText").animate({"width": 0}, 150);
        }
    });

});