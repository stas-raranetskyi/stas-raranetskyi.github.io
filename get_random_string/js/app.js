var App = (function() {
    var dataVal,
        strValId = 'your-string-val',
        segmValId = 'your-segment-val',
        type,
        state = true;
    return {
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getdataVal: function () {
            return dataVal;
        },
        setdataVal: function(){
            type = document.querySelector('.js-type:checked').dataset.type;
            if(type == 'segm-title'){
                dataVal = getById(segmValId).value;
            }
            else if(type == 'str-title'){
                dataVal = getById(strValId).value;
            }

            if(dataVal.length < 1){
                alert("Input data");
                state = false;
            }
            else{
                state = true;
            }
        },
        isEmpty: function(str) {
            if (str.trim() == '')
                return true;
            return false;
        },
        getRand: function () {

            var that = this;
            if(type == 'segm-title'){
                dataVal = getById(segmValId).value;
                var newArr = dataVal.split('-'),
                    randNumb = this.getRandomInt(parseInt(newArr[0]), parseInt(newArr[1]));

                getById('result').innerHTML = randNumb;
            }
            else if(type == 'str-title'){
                dataVal = getById(strValId).value;
                var newArr = dataVal.split('\n');

                newArr.map(function(currentValue, index, array){
                    if(that.isEmpty(currentValue)){
                        newArr.splice(index, 1);
                    }
                });
                var len = newArr.length,
                    randNumb = this.getRandomInt(0, len);
                console.log(len);
                getById('result').innerHTML = newArr[randNumb];
            }
        },
        run: function(){
            if(!state){
                return false;
            }
            this.setdataVal();
            this.getRand();
        }
    }
}());


getById("run").onclick = function(){
    App.run();
}

getById("form-app").onsubmit = function(){
    App.run();
    return false;
}
