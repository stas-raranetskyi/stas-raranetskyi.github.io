/*load images start page*/

for(var i = 0; i < 4; i++){
    var image = new Image();
    image.src = 'images/head-' + i + '.png';
    image = new Image();
    image.src = 'images/body-' + i + '.png';
    image = new Image();
    image.src = 'images/tale-' + i + '.png';
}

var Game = function(name){

    /*fields*/
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'red';
    this.gameEngine;
    this.n = 30;
    this.m = 20;
    this.scale = 30;
    this.w = this.scale * this.n;
    this.h = this.scale * this.m;
    this.dir = 2;
    this.num = 5;
    this.score = 0;
    this.speed = 200;
    this.width = this.n * this.scale;
    this.height = this.m * this.scale;
    this.indent = 50;
    this.snake = [];
    this.appleImg = new Image();
    this.appleImg.src = 'images/apple.png';
    this.snakeCoord = {
        x: 0,
        y: 0,
        dir: this.dir
    };
    this.newPosApple = true;
    this.apple = ['x','y'];
    this.pause = false;
    this.over = false;
    this.gameOverText = {
        text: 'Game over',
        draw: false,
    };
    this.pauseText = {
        text: 'Pause',
        draw: false,
    };
    this.scoreText = {
        text: 'Score ',
        draw: false,
    };
    this.style = 'image';
    this.strokeField = false;

    var game = this;
    game.canvas.width = game.width;
    game.canvas.height = game.height + game.indent;

    /*metods*/

    function clone(obj) {
        if (null == obj || 'object' != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    this.fillSnake = function() {
        for (var i = 0; i < game.num; i++) {
            game.snake.push(clone(game.snakeCoord));
        }
    };

    this.snakePos = function(){
        game.snake[0].x = game.num - 1;
        game.snake[0].y = 0;
        var i;
        for (i = 1; i < game.num; i++){
            game.snake[i].x = game.snake[i - 1].x - 1;
            game.snake[i].y = game.snake[0].y;
        }
    };

    this.drawSnake = function(){
        var i;
        game.snake[0].dir = game.dir;
        for(i = game.num - 1; i > 0; --i){
            game.snake[i].x = game.snake[i - 1].x;
            game.snake[i].y = game.snake[i - 1].y;
            game.snake[i].dir = game.snake[i - 1].dir;
        }
        if(game.dir == 0){
            game.snake[0].x -= 1;
        }
        else if(game.dir == 1){
            game.snake[0].y -= 1;
        }
        else if(game.dir == 2){
            game.snake[0].x += 1;
        }
        else if(game.dir == 3){
            game.snake[0].y += 1;
        }

        if(game.snake[0].x == game.apple.x && game.snake[0].y == game.apple.y){
            game.num++;
            game.score++;
            if(game.speed > 10){
                game.speed -= 10;
            }
            game.snake[game.num - 1] = {
                x: 0,
                y: 0
            };
            game.snake[game.num - 1].x = game.snake[game.num - 2].x;
            game.snake[game.num - 1].y = game.snake[game.num - 2].y;
            game.snake[game.num - 1].dir = game.snake[game.num - 2].dir;
            game.newPosApple = true;
        }
        else if(game.snake[0].x == game.n || game.snake[0].x == -1 || game.snake[0].y == -1 || game.snake[0].y == game.m){
            game.over = true;
        }
        else{
            for(var i = 1; i < game.num; i++){
                if(game.snake[i].x == game.snake[0].x && game.snake[i].y == game.snake[0].y){
                    game.over = true;
                }
            }
        }

        for(var i = 0; i < game.num; i++){

            
            if(game.style == 'color'){
                game.context.fillStyle = '#feaa60';
            }
            else if(game.style == 'image'){
                var image = new Image();
                image.src = 'images/body-' + game.snake[i].dir + '.png';
            }

            if(i == 0 || i == 1){
                if(game.style == 'color'){
                    game.context.fillStyle = '#ff4d77';
                }
                else if(game.style == 'image'){
                    image.src = 'images/head-' + game.snake[i].dir + '.png';
                }
            }
            else if(i == game.num - 1){
                image.src = 'images/tale-' + game.snake[i].dir + '.png';
            }

            if(game.style == 'color'){
                game.context.fillRect(game.snake[i].x * game.scale, game.snake[i].y * game.scale, game.scale, game.scale);
            }
            else if(game.style == 'image'){
                var sourceX = 0;
                var sourceY = 0;
                var sourceWidth = game.scale;
                var sourceHeight = game.scale;
                var destWidth = sourceWidth;
                var destHeight = sourceHeight;
                var destX = game.snake[i].x * game.scale;
                var destY = game.snake[i].y * game.scale;
                if(i == 0){
                    if(game.snake[i].dir == 2){
                        sourceX = game.scale;
                    }
                    else if(game.snake[i].dir == 3){
                        sourceY = game.scale;
                    }
                }else if(i == 1){
                    if(game.snake[i].dir == 0){
                        sourceX = game.scale;
                    }
                    else if(game.snake[i].dir == 1){
                        sourceY = game.scale;
                    }
                }
                game.context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
            }
        }
        console.log(game.snake[game.num - 1]);
    }

    this.drawField = function(){
        game.context.fillStyle = '#ffffff';
        game.context.fillRect(0, 0, game.width, game.height);
        var i,j;
        if(game.strokeField){
            game.context.strokeStyle = '#9ed556';
            for (i = 0; i <= this.w; i += this.scale){
                game.context.moveTo(i,0);
                game.context.lineTo(i,this.h);
            }
            for (j = 0; j <= this.h; j += this.scale) {
                game.context.moveTo(0,j);
                game.context.lineTo(this.w,j);
            }
            game.context.stroke();
            game.context.strokeRect(0,0,game.width, game.height);
        }
    };

    this.drawApple = function(){
        if(game.newPosApple){
            this.apple.x = Math.random() * this.n | 0;
            this.apple.y = Math.random() * this.m | 0;
            game.newPosApple = false;
        }
        if(game.style == 'color'){
            game.context.fillStyle = '#ff0000';
            game.context.fillRect(parseInt(game.apple.x) * game.scale, parseInt(game.apple.y) * game.scale, game.scale, game.scale);
        }
        else if(game.style == 'image'){
            game.context.drawImage(game.appleImg, parseInt(game.apple.x) * game.scale, parseInt(game.apple.y) * game.scale);
        }
    };

    this.reset = function(){
        game.num = 5;
        game.snake = [];
        game.dir = 2;
        game.score = 0;
        game.speed = 200;
        game.over = false;
        game.pause = false;
        this.fillSnake();
        this.snakePos();
    }

    this.fillSnake();
    this.snakePos();

    this.drawText = function(textObj,x,y){
        if(!textObj.draw){
            game.context.font = textObj.hasOwnProperty('font') ? textObj.font : '30px Arial';
            game.context.fillStyle = textObj.hasOwnProperty('color') ? textObj.color : '#000000';
            game.context.textAlign = textObj.hasOwnProperty('textAlign') ? textObj.textAlign : 'center';
            game.context.textBaseline = textObj.hasOwnProperty('textBaseline') ? textObj.textBaseline : 'middle';
            if(typeof x == 'undefined' || x == null){
                x = game.width / 2;
            }
            if(typeof y == 'undefined' || y == null){
                y = game.height / 2;
            }
            game.context.fillText(textObj.text,x,y);
            textObj.draw = true;
        }
    }

    this.drawGame = function(){
        if(!game.pause && !game.over){
            game.context.clearRect(0,0,game.width,game.height + game.indent);
            this.drawField();
            this.drawSnake();
            this.drawApple();
            game.scoreText.text = 'Score: ' + game.score;
            game.scoreText.textBaseline = 'top';
            this.drawText(this.scoreText,null,game.height + 10);
            game.scoreText.draw = false;
        }
        else if(game.pause && !game.over){
            this.drawText(game.pauseText);
        }
        else if(!game.pause && game.over){
            this.drawText(game.gameOverText);
        }
    };

    var nextStep = (function(){
        return requestAnimationFrame ||
            webkitRequestAnimationFrame ||
            mozRequestAnimationFrame ||
            oRequestAnimationFrame ||
            msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback,1000 / 60);
            }

    })();

    document.onkeydown = function (event) {
        if(event.keyCode == 37 && game.dir != 2){
            game.dir = 0;
        }
        else if(event.keyCode == 38 && game.dir != 3){
            game.dir = 1;
        }
        else if(event.keyCode == 39 && game.dir != 0){
            game.dir = 2;
        }
        else if(event.keyCode == 40 && game.dir != 1){
            game.dir = 3;
        }
        else if(event.keyCode == 27 || event.keyCode == 32){
            game.pause = true;
        }
        else if(event.keyCode == 13){
            game.pause = false;
            game.gameOverText.draw = false;
            game.pauseText.draw = false;
            if(game.over){
                game.reset();
            }
        }
    };

    document.addEventListener('touchstart', handleTouchStart, false);        
    document.addEventListener('touchmove', handleTouchMove, false);

    var xDown = null;                                                        
    var yDown = null;                                                        

    function handleTouchStart(evt) {                                         
        xDown = evt.touches[0].clientX;                                      
        yDown = evt.touches[0].clientY;                                      
    };                                                

    function handleTouchMove(evt) {
        if ( ! xDown || ! yDown ) {
            return;
        }
        var xUp = evt.touches[0].clientX;                                    
        var yUp = evt.touches[0].clientY;

        var xDiff = xDown - xUp;
        var yDiff = yDown - yUp;

        if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
            if ( xDiff > 0 ) {
                game.dir = 0;
            } else {
                game.dir = 2;
            }                       
        } else {
            if ( yDiff > 0 ) {
                game.dir = 1;
            } else { 
                game.dir = 3;
            }                                                                 
        }
        xDown = null;
        yDown = null;                                             
    };

    this.gameEngineStart = function(callback){
        if(typeof callback == 'undefined'){
            callback = game.drawGame;
        }
        game.gameEngine = callback;
        game.gameEngineStep();
    }

    this.gameEngineStep = function(){
        setTimeout(function(){
            game.gameEngine();
            nextStep(game.gameEngineStep);
        },game.speed)
    };

    this.setGameEngine = function(callback){
        game.gameEngine = callback;
    }

}

var game = new Game('game');


game.gameEngineStart();
