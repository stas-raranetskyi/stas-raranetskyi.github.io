var Game = function(name){

    /*fields*/
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext('2d');
    this.context.fillStyle = 'red';
    this.gameEngine;
    this.n = 20;
    this.m = 20;
    this.scale = 25;
    this.w = this.scale * this.n;
    this.h = this.scale * this.m;
    this.dir = 2;
    this.num = 4;
    this.score = 0;
    this.speed = 200;
    this.width = 500;
    this.height = 500;
    this.indent = 50;
    this.snake = [];
    this.snakeCoord = {
        x: 0,
        y: 0
    };
    this.newPosApple = true;
    this.apple = ['x','y'];
    this.pause = false;
    this.over = false;
    this.gameOverText = {
        text: 'Game Over',
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

    var game = this;
    game.canvas.width = game.width;
    game.canvas.height = game.width + game.indent;

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
        for(i = game.num - 1; i > 0; --i){
            game.snake[i].x = game.snake[i - 1].x;
            game.snake[i].y = game.snake[i - 1].y;
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
            game.context.strokeStyle = '#0000ff';
            if(i == 0){
                game.context.strokeStyle = '#ff0000';
            }
            game.context.strokeRect(game.snake[i].x * game.scale, game.snake[i].y * game.scale, game.scale, game.scale);
        }
    }

    this.drawField = function(){
        var i,j;
        game.context.strokeStyle = '#00ff00';
        for (i = 0; i <= this.w; i += this.scale){
            game.context.moveTo(i,0);
            game.context.lineTo(i,this.h);
        }
        for (j = 0; j <= this.h; j += this.scale) {
            game.context.moveTo(0,j);
            game.context.lineTo(this.w,j);
        }
        game.context.stroke();
    };

    this.drawApple = function(){
        if(game.newPosApple){
            this.apple.x = Math.random() * this.n | 0;
            this.apple.y = Math.random() * this.m | 0;
            game.newPosApple = false;
        }
        game.context.fillStyle = '#ff0000';
        game.context.fillRect(parseInt(this.apple.x) * this.scale, parseInt(this.apple.y) * this.scale, this.scale, this.scale);
    };

    this.reset = function(){
        game.num = 4;
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
            game.scoreText.text = 'Score ' + game.score;
            game.scoreText.textBaseline = 'top';
            this.drawText(this.scoreText,null,510);
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
        else if(event.keyCode == 27){
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
