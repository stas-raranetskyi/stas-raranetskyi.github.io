
var RunningArrow = function(id, settings){

    var circleRadius = 10;
    var widthArrow = 200;
    var defaultSettings = {
        lines: settings.lines || [],
        circles: settings.circles || [],
        widthArrow: settings.widthArrow || widthArrow,
        weightArrow: settings.weightArrow || 4,
        colorArrow: settings.colorArrow || '#FC273D',
        colorLines: settings.colorLines || 'rgba(255, 100, 75, 1)',
        weightLines: settings.weightLines || 2,
        circleRadius: settings.circleRadius || circleRadius,
        circleColor: settings.circleColor || '#ffffff',
        start: settings.start || {x: (settings.widthArrow || widthArrow), y: circleRadius},
        dir: settings.dir || {x: 1, y: 0},
        widthArrowPart: settings.widthArrowPart || 10
    }

    var xdir = defaultSettings.dir.x;
    var ydir = defaultSettings.dir.y;
    var arrow = [{x: defaultSettings.start.x, y: defaultSettings.start.y}];

    var w = 1100;
    var h = 210;
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var size = getSizeCanvas(defaultSettings.lines);
    canvas.width = size.w + defaultSettings.circleRadius;
    canvas.height = size.h + defaultSettings.circleRadius;
    var fps = 600;
    var fpsInterval = 1000 / fps;;
    var then = Date.now();;
    var elapsed;
    var now;

    function getSizeCanvas(lines){
        return lines.reduce(function(acc, line){
            var maxX = Math.max(line.x1, line.x2);
            var maxY = Math.max(line.y1, line.y2);
            acc.w = Math.max(acc.w, maxX);
            acc.h = Math.max(acc.h, maxY);
            return acc;
        }, {w: 0, h: 0});
    }

    function clone(obj) {
        if (null == obj || 'object' != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    };

    function defaultPosArrow(){
        for(var i = 1; i < defaultSettings.widthArrow; i++){
            var j = arrow.length - i;
            var part = arrow[j];
            var partArrow = {
                x: part.x - xdir,
                y: part.y - ydir,
            }
            arrow.unshift(partArrow);
        }
    };

    function updateArrow(){
        var head = getHeadArrow();
        arrow.shift();
        head.x += xdir;
        head.y += ydir;
        arrow.push(head);
    }

    function drawArrow() {
        context.fillStyle = defaultSettings.colorArrow;
        for (var i = 0; i < arrow.length; i++) {
            context.fillRect(arrow[i].x - defaultSettings.weightArrow / 2, arrow[i].y - defaultSettings.weightArrow / 2, defaultSettings.weightArrow, defaultSettings.weightArrow);
        }
    };

    function getHeadArrow(){
        return clone(arrow[arrow.length - 1]);
    }

    function setDir(x, y){
        xdir = x;
        ydir = y;
    }

    function drawArrowLines(){
        var head = getHeadArrow();

        var startPoint1 = {
            x: head.x,
            y: head.y
        };
        var endPoint1 = {
            x: xdir === 1 || ydir === -1 ? head.x - defaultSettings.widthArrowPart : ydir === 1 ? head.x + defaultSettings.widthArrowPart : 0,
            y: xdir === 1 || ydir === 1 ? head.y - defaultSettings.widthArrowPart : ydir === -1 ? head.y + defaultSettings.widthArrowPart : 0
        };
        drawLine(startPoint1.x, startPoint1.y, endPoint1.x, endPoint1.y, defaultSettings.colorArrow, defaultSettings.weightArrow);

        var startPoint2 = {
            x: head.x,
            y: head.y
        };
        var endPoint2 = {
            x: xdir === 1 || ydir === 1 ? head.x - defaultSettings.widthArrowPart : ydir === -1 ? head.x + defaultSettings.widthArrowPart : 0,
            y: xdir === 1 || ydir === -1 ? head.y + defaultSettings.widthArrowPart : ydir === 1 ? head.y - defaultSettings.widthArrowPart : 0
        };
        drawLine(startPoint2.x, startPoint2.y, endPoint2.x, endPoint2.y, defaultSettings.colorArrow, defaultSettings.weightArrow);
    };

    function drawLine(x1, y1, x2, y2, color, lineWidth){
        context.strokeStyle = color || defaultSettings.colorLines;
        context.lineWidth = lineWidth || defaultSettings.weightLines;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
    }

    function drawCircle(x, y, r){
        context.fillStyle = defaultSettings.circleColor;
        context.lineWidth = 0;
        context.beginPath();
        context.arc(x, y, r, 0, 2 * Math.PI);
        context.fill();
    }

    function drawSkeleton(){
        context.lineWidth = 1;
        for(var i = 0; i < defaultSettings.lines.length; i++){
            var line = defaultSettings.lines[i];
            drawLine(line.x1, line.y1, line.x2, line.y2);
        }
    }

    function drawCircles(){
        context.lineWidth = 0;
        for(var i = 0; i < defaultSettings.circles.length; i++){
            var circle = defaultSettings.circles[i];
            drawCircle(circle.x, circle.y, defaultSettings.circleRadius);
        }
    }

    function drawAll(){
        context.clearRect(0, 0, w, h);
        drawSkeleton();
        updateArrow();
        drawArrow();
        drawArrowLines();
        drawCircles();
        var head = getHeadArrow();
        for(var i = 0; i < defaultSettings.lines.length; i++){
            var line = defaultSettings.lines[i];
            if(head.x === line.x2 && head.y === line.y2){
                if(typeof line.start === 'object'){
                    arrow[arrow.length - 1].x = line.start.x;
                    arrow[arrow.length - 1].y = line.start.y;
                }
                else{
                    setDir(line.dir.x, line.dir.y);
                }
            }
        }
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

    function engineStep(){
        loopId = loop(engineStep);
		now = Date.now();
        elapsed = now - then;
        if (elapsed > fpsInterval) {
            then = now - (elapsed % fpsInterval);
        }
        drawAll();
    };

    defaultPosArrow();

    this.run = function(){
        engineStep();
    }

    this.stop = function(){
        stop(loopId);
    }

};

var line = new RunningArrow('line-img',{
    lines: [
        {x1: 10, y1: 10, x2: 250, y2: 10, dir: {x: 0, y: 1}},
        {x1: 250, y1: 10, x2: 250, y2: 200, dir: {x: 1, y: 0}},
        {x1: 250, y1: 200, x2: 530, y2: 200, dir: {x: 0, y: -1}},
        {x1: 530, y1: 200, x2: 530, y2: 60, dir: {x: 1, y: 0}},
        {x1: 530, y1: 60, x2: 810, y2: 60, dir: {x: 0, y: 1}},
        {x1: 810, y1: 60, x2: 810, y2: 200, dir: {x: 1, y: 0}},
        {x1: 810, y1: 200, x2: 1070, y2: 200, start: {x: 10, y: 10}}
    ],
    circles: [
        {x: 10, y: 10},
        {x: 250, y: 200},
        {x: 530, y: 60},
        {x: 810, y: 200}
    ],
    widthArrow: 200
});

line.run();
