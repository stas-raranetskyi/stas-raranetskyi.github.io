var App = (function() {
    var stringVal,
        stringValId = 'your-string-val',
        state = true;
    return {
        getRandomInt: function(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        getStringVal: function () {
            return stringVal;
        },
        setStringVal: function(){
            stringVal = getById(stringValId).value;
            if(stringVal.length < 1){
                alert("Введите строку");
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
        concat: function () {
            var newArr = stringVal.split('\n'),
                that = this;
            newArr.map(function(currentValue, index, array){
                if(that.isEmpty(currentValue)){
                    newArr.splice(index, 1);
                }
            });
            var len = newArr.length,
                randNumb = this.getRandomInt(0, len);
            getById('result').innerHTML = newArr[randNumb];
        },
        run: function(){
            if(!state){
                return false;
            }
            this.setStringVal();
            this.concat();
        }
    }
}());


getById("run").onclick = function(){
    App.run();
}
