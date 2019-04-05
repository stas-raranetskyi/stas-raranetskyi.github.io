
Object.prototype.copy = function() {
    if (this === null || typeof this !== 'object') return this;
    var copy = this.constructor();
    for (var attr in this) {
        if (this.hasOwnProperty(attr)){
            copy[attr] = this[attr];
        }
    }
    return copy;
};

var Game = function(name){

    /*fields*/
    this.canvas = document.getElementById(name);
    this.context = this.canvas.getContext('2d');
    this.gameEngine;
    this.n = 30;
    this.m = 20;
    this.scale = 30;
    this.width = this.n * this.scale;
    this.height = this.m * this.scale;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.snake = [{x: 0, y: 0}];
    this.xdir = 1;
    this.ydir = 0;
    var game = this;
    var pause = false;
    var fpsInterval;
    var then;
    var elapsed;
    var now;
    var loopId = null;

    this.getHead = function(){
        return game.snake[game.snake.length - 1].copy();
    }

    this.updateSnake = function(){
        var head = this.getHead();
        game.snake.shift();
        head.x += this.xdir;
        head.y += this.ydir;
        game.snake.push(head);
    }

    this.growSnake = function(){
        var head = this.getHead();
        game.snake.push(head);
    }

    this.drawSnake = function(){
        game.context.fillStyle = '#000000';
        for(var i = 0; i < game.snake.length; i++){
            game.context.fillRect(game.snake[i].x * this.scale, game.snake[i].y * this.scale, this.scale, this.scale);
        }
    }

    this.drawApple = function(){
        game.context.fillStyle = '#ff0000';
        game.context.fillRect(game.apple.x * this.scale, game.apple.y * this.scale, this.scale, this.scale);
    };

    this.eat = function(food){
        var head = this.getHead();
        return head.x === food.x && head.y === food.y;
    }

    this.setPosFood = function(){
        var x = Math.floor(Math.random() * this.n) || 0;
        var y = Math.floor(Math.random() * this.m) || 0;
        return {x: x, y: y}
    }

    this.endGame = function() {
        var head = this.getHead();
        var x = head.x * this.scale;
        var y = head.y * this.scale;
        if(x > this.width - 1 || x < 0 || y > this.height - 1 || y < 0) {
            return true;
        }
        for(var i = 0; i < this.snake.length - 1; i++) {
            var part = this.snake[i];
            if(part.x * this.scale == x && part.y * this.scale == y) {
                return true;
            }
        }
        return false;
    }

    this.drawGame = function(){
        game.context.clearRect(0, 0, game.width, game.height);
        this.updateSnake();
        this.drawSnake();
        if(this.endGame()){
            stop(loopId);
            game.context.fillStyle = '#ff0000';
            game.context.fillRect(0, 0, this.width, this.width);
        }
        if(this.eat(game.apple)){
            this.growSnake();
            this.apple = this.setPosFood();
        }
        this.drawApple();
    };

    this.setDir = function(x, y){
        game.xdir = x;
        game.ydir = y;
    }

    var loop = (function(){
        return requestAnimationFrame ||
            webkitRequestAnimationFrame ||
            mozRequestAnimationFrame ||
            oRequestAnimationFrame ||
            msRequestAnimationFrame ||
            function(callback){
                window.setTimeout(callback,1000 / 60);
            }
    })();

    var stop = (function(){
        return cancelAnimationFrame ||
            webkitCancelAnimationFrame ||
            mozCancelAnimationFrame ||
            oCancelAnimationFrame ||
            msCancelAnimationFrame ||
            function(callback){
                window.setTimeout(callback,1000 / 60);
            }
    })();

    document.onkeydown = function (event) {
        if(event.keyCode == 37 && game.xdir != 1){
            game.setDir(-1, 0);
        }
        else if(event.keyCode == 38 && game.ydir != 1){
            game.setDir(0, -1);
        }
        else if(event.keyCode == 39 && game.xdir != -1){
            game.setDir(1, 0);
        }
        else if(event.keyCode == 40 && game.ydir != -1){
            game.setDir(0, 1);
        }
        else if(event.keyCode == 27 || event.keyCode == 32){
            pause = true;
            stop(loopId);
        }
        else if(event.keyCode == 13){
            if(pause){
                game.gameEngineStep();
                pause = false;
            }
        }
    };

    this.gameEngineStart = function(fps, callback){
        if(typeof callback == 'undefined'){
            callback = game.drawGame;
        }
        if(typeof fps == 'undefined'){
            fps = 7;
            fpsInterval = 1000 / fps;
            then = Date.now();
        }
        game.gameEngine = callback;
        this.apple = this.setPosFood();
        game.gameEngineStep();
    }

    this.gameEngineStep = function(){
        loopId = loop(game.gameEngineStep);
		now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            game.gameEngine();
        }
    };
}

var game = new Game('game');


game.gameEngineStart();
