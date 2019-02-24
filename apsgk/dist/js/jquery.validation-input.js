/**
 *   jquery.validation-input HEAD:v 1.1.0 :)
 *
 *   by Stas Raranetsky
 *   r.starta@yandex.ua
 *
 *
 */
;

(function($){

    var defaults = {
        requiredInputClass:"required",
        buttonClass:"btn-submit",
        errorClass: "error",
        errorTextEmpty: "Заполните, пожалуйста, поле",
        errorTextEmail: "*E-mail введено не коректно",
        errorTextName: "В поле используются запрещенные символы",
        errorTextNumber: "Некорректно введен номер телефона",
        errorTextDomen: "Введенное значение не является доменом",
        errorTextDateWest: "Введенное значение не является датой формата YYYY-MM-DD",
        errorTextDateEast: "Введенное значение не является датой формата DD/MM/YYYY",
        errorTextAgeSelect: "Выберите возрастную группу",
        errorTextDateSelect: "Выберите дату мастер класса",
        errorTextLevelSelect: "Выберите уровень подготовки",
        positionErrorLabel: ["100%","10px"],
        success : function(form){},
        error : function(form){}
    };

    var pattern_email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/,
        pattern_name = /^([a-zа-яёі]+|\d+)$/i,
        //pattern_number = /^(\+38 (0[\- ]?)?(\(?\d{3}\))?[\- ]?)?[\d\- ]{7,10}$/,
        pattern_number = /\+38\s\(0[0-9]{2}\)\s[0-9]{3}\-[0-9]{2}\-[0-9]{2}/,
        pattern_domen = /^([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}$/,
        pattern_date_west = /[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])/, /*Дата в формате YYYY-MM-DD*/
        pattern_date_east = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/; /*Дата в формате DD/MM/YYYY*/

    $.fn.checkForm = function(options){

        return this.each(function(){

            var that = $(this).first(),
                config;

            if (options) {
                config = $.extend({},defaults, options);
            }
            else{
                config = defaults;
            }

            // Объявляем переменные
            that.find("input[type=submit]").toggleClass(config.buttonClass);
            var form = that,
                btn = form.find("." + config.buttonClass),
                required_input = form.find("." + config.requiredInputClass),
                type_input,parent_input,value;

            that.init = function(){

                required_input.each(function(){
                    $(this).wrap('<span class="required-input-wrap">');
                });

            };

            that.run = function(){

                function addErrorLabel(el,text){
                    $("<div>",{
                        "class":"error-label"
                    })/*.css({
                        "top":config.positionErrorLabel[0],
                        "left":config.positionErrorLabel[1]
                    })*/.text(text).appendTo(el);
                }

                function removeErrorLabel(el){
                    el.find(".error-label").remove();
                }

                // Функция проверки полей формы
                function checkInput(){
                    required_input.each(function(){
                        type_input = $(this).data("type");
                        parent_input = $(this).closest(".required-input-wrap");
                        value = $(this).val();
                        removeErrorLabel(parent_input);
                        if(value == '' && type_input != "select-age" && type_input != "select-date" && type_input != "select-level"){
                            // Если поле пустое добавляем класс-указание
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextEmpty);
                        }
                        else if(type_input == "email" && !pattern_email.test(value)){
                            // Проверка поля почта
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextEmail);
                        }
                        else if(type_input == "name" && !pattern_name.test(value)){
                            // Проверка правильности ввода имени
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextName);
                        }
                        else if(type_input == "phone" && !pattern_number.test(value)){
                            // Проверка правильности ввода имени
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextNumber);
                        }
                        else if(type_input == "select-age" && value == ""){
                            // Проверка правильности ввода имени
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextAgeSelect);
                        }
                        else if(type_input == "select-date" && value == ""){
                            // Проверка правильности ввода имени
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextDateSelect);
                        }
                        else if(type_input == "select-level" && value == ""){
                            // Проверка правильности ввода имени
                            $(this).addClass(config.errorClass);
                            addErrorLabel(parent_input,config.errorTextLevelSelect);
                        }
                        else {
                            // Если поле не пустое удаляем класс-указание
                            $(this).removeClass(config.errorClass);
                        }
                    });
                }

                btn.click(function(){
                    checkInput();
                    var sizeEmpty = form.find('.' + config.errorClass).size();
                    if(sizeEmpty > 0){
                        config.error();
                        return false;
                    } else {

                        
                        form.submit();
                    }
                });

            };

            that.init();
            that.run();

        });

    }

})(jQuery);