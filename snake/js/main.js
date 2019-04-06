
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
    var canvas = document.getElementById(name);
    var context = canvas.getContext('2d');
    var gameEngine;
    var n = 30;
    var m = 20;
    var scale = 30;
    var width = n * scale;
    var height = m * scale;
    var xdir = 1;
    var ydir = 0;
    var snake = [{x: 0, y: 0}];
    var food = setPosFood();
    var pause = false;
    var fpsInterval;
    var then;
    var elapsed;
    var now;
    var loopId = null;
    canvas.width = width;
    canvas.height = height;

    function getHead(){
        return snake[snake.length - 1].copy();
    }

    function updateSnake(){
        var head = getHead();
        snake.shift();
        head.x += xdir;
        head.y += ydir;
        snake.push(head);
    }

    function growSnake(){
        var head = getHead();
        snake.push(head);
    }

    function drawSnake(){
        context.fillStyle = '#000000';
        for(var i = 0; i < snake.length; i++){
            context.fillRect(snake[i].x * scale, snake[i].y * scale, scale, scale);
        }
    }

    function drawFood(){
        context.fillStyle = '#ff0000';
        context.fillRect(food.x * scale, food.y * scale, scale, scale);
    };

    function eat(food){
        var head = getHead();
        return head.x === food.x && head.y === food.y;
    }

    function setPosFood(){
        var x = Math.floor(Math.random() * n) || 0;
        var y = Math.floor(Math.random() * m) || 0;
        return {x: x, y: y}
    }

    function endGame() {
        var head = getHead();
        var x = head.x * scale;
        var y = head.y * scale;
        if(x > width - 1 || x < 0 || y > height - 1 || y < 0) {
            return true;
        }
        for(var i = 0; i < snake.length - 1; i++) {
            var part = snake[i];
            if(part.x * scale == x && part.y * scale == y) {
                return true;
            }
        }
        return false;
    }

    function drawGame(){
        context.clearRect(0, 0, width, height);
        updateSnake();
        drawSnake();
        if(endGame()){
            stop(loopId);
            context.fillStyle = '#ff0000';
            context.fillRect(0, 0, width, width);
        }
        if(eat(food)){
            growSnake();
            food = setPosFood();
        }
        drawFood();
    };

    function setDir(x, y){
        xdir = x;
        ydir = y;
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
        if(event.keyCode == 37 && xdir != 1){
            setDir(-1, 0);
        }
        else if(event.keyCode == 38 && ydir != 1){
            setDir(0, -1);
        }
        else if(event.keyCode == 39 && xdir != -1){
            setDir(1, 0);
        }
        else if(event.keyCode == 40 && ydir != -1){
            setDir(0, 1);
        }
        else if(event.keyCode == 27 || event.keyCode == 32){
            pause = true;
            stop(loopId);
        }
        else if(event.keyCode == 13){
            if(pause){
                gameEngineStep();
                pause = false;
            }
        }
    };

    function gameEngineStep(){
        loopId = loop(gameEngineStep);
		now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
            gameEngine();
        }
    };

    this.gameEngineStart = function(fps, callback){
        if(typeof callback == 'undefined'){
            callback = drawGame;
        }
        if(typeof fps == 'undefined'){
            fps = 7;
        }
        fpsInterval = 1000 / fps;
        then = Date.now();
        gameEngine = callback;
        gameEngineStep();
    }
}

var game = new Game('game');
game.gameEngineStart();
