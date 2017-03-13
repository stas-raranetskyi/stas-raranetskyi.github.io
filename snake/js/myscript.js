$(document).ready(function(){

    var n = 20;
    var m = 20;
    var scale = 25;
    var w = scale * n;
    var h = scale * m;
    var dir = 2,num = 4,score = 0,speed = 200;

    function e(id){
        return document.getElementById(id);
    }

    var wrapCanvas = e("game");
    wrapCanvas.width = w;
    wrapCanvas.height = h;
    var canvas = wrapCanvas.getContext('2d');
    function drawField(){
        var i,j;
        canvas.strokeStyle = '#00ff00';
        for (i = 0; i <= w; i+=scale){
            canvas.moveTo(i,0);
            canvas.lineTo(i,h);
            for (j = 0; j <= h; j+=scale) {
                canvas.moveTo(0,j);
                canvas.lineTo(w,j);
            }
        }
        canvas.stroke();
    }


    function clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }

    var snakeCoord = {
        x:0,
        y:0
    };

    var snake = [];

    function fillSnake() {
        for (var i = 0; i < num; i++) {
            snake.push(clone(snakeCoord));
        }
    }

    fillSnake();

    function snakePos(){
        snake[0].x = num - 1;
        snake[0].y = 0;
        var i;
        for (i = 1; i < num; i++){
            snake[i].x = snake[i - 1].x - 1;
            snake[i].y = snake[0].y;
        }
    }

    snakePos();

    function drawSnake(){
        var i;
        for(i = 0; i < num; i++){
            canvas.strokeStyle = '#0000ff';
            if(i == 0){
                canvas.strokeStyle = '#ff0000';
            }
            canvas.strokeRect(snake[i].x * scale, snake[i].y * scale, scale, scale);
        }
    }

    var apple = ["x","y"];

    function drawApple(){
        apple.x = Math.random() * n | 0;
        apple.y = Math.random() * m | 0;
        canvas.fillStyle = "#ff0000";
        canvas.fillRect(parseInt(apple.x) * scale, parseInt(apple.y) * scale, scale, scale);
    }

    drawApple();

    function runSnake(){
        var i;
        for(i = num - 1; i > 0; --i){
            snake[i].x = snake[i - 1].x;
            snake[i].y = snake[i - 1].y;
        }

        if(dir == 0){
            snake[0].x -= 1;
        }
        if(dir == 1){
            snake[0].y -= 1;
        }
        if(dir == 2){
            snake[0].x += 1;
        }
        if(dir == 3){
            snake[0].y += 1;
        }
        if(snake[0].x == apple.x && snake[0].y == apple.y){
            num++;
            score++;
            speed -= 200;
            e("result").innerHTML = score;
            fillSnake();
            canvas.clearRect(parseInt(apple.x) * scale, parseInt(apple.y) * scale, scale, scale);
            canvas.strokeStyle = "#ff0000";
            canvas.strokeRect(parseInt(apple.x) * scale, parseInt(apple.y) * scale, scale, scale);
            snake[num - 1].x = snake[num - 2].x;
            snake[num - 1].y = snake[num - 2].y;
            drawApple();
        }
    }

    function display(){
        drawField();
        drawSnake();
    }
    var timer;

    function stopGame(){
        clearInterval(timer);
        e("resultGame").innerHTML = "<div>GameOver</div><a href='#' class='restart'>Спробувати знову</a>";
        $(".pauseGame").html('');
        document.onkeydown = function (event) {
            if (event.keyCode == 13){
                location.reload();
            }
        };
    }

    function runGame(){
        var timer1 = setInterval(function(){
            display();
            runSnake();
            if(snake[0].x == n || snake[0].x == -1 || snake[0].y == -1 || snake[0].y == m){
                stopGame();
            }
            for(var i = 1; i < num; i++){
                if(snake[i].x == snake[0].x && snake[i].y == snake[0].y){
                    stopGame();
                }
            }
            clearInterval(timer1);
        },1);
    }

    function run(){
        $(".processGame").html('<a href="#" class="pauseGame">Пауза</a>');
        timer = setInterval(function(){
            runGame();
        },speed);
    }

    run();

    document.onkeydown = function (event) {
        if (event.keyCode == 37 && dir != 2)
            dir = 0;
        if (event.keyCode == 38 && dir != 3)
            dir = 1;
        if (event.keyCode == 39 && dir != 0)
            dir = 2;
        if (event.keyCode == 40 && dir != 1)
            dir = 3;
    };

    $(document).on("click",".pauseGame",function(){
        clearInterval(timer);
        $(".processGame").html('<a href="#" class="runGame">Відновити</a>');
        return false;
    });

    $(document).on("click",".runGame",function(){
        run();
        return false;
    });

    $(document).on("click",".restart",function(){
        location.reload();
        return false;
    });

});