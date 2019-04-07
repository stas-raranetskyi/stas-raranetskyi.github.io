
var RunningArrow = function(id, settings){

    var circleRadius = 10;
    var widthLine = 200;
    var defaultSettings = {
        lines: [],
        circles: [],
        widthLine: widthLine,
        start: {x: widthLine, y: circleRadius},
        circleRadius: circleRadius,
        dir: {
            x: 1,
            y: 0
        }
    }

    var xdir = defaultSettings.dir.x;
    var ydir = defaultSettings.dir.y;
    var arrow = [{x: defaultSettings.start.x, y: defaultSettings.start.y}];

    var w = 1100;
    var h = 210;
    var draw = SVG(id).size(w, h);
    var canvas = document.getElementById(id);
    var context = canvas.getContext('2d');
    var circleRadius = 10;
    var widthLine1 = 252;
    var heightLine2 = h;
    var widthLine3 = 280;
    var heightLine4_6 = 138;
    var widthLine5 = 281;
    var widthLine7 = 265;
    var step = 3;
    var widthArrow = 200 / step;
    var widthArrowLine = 8;
    var weightArrow = 2;
    var lineArrowGroup = draw.group();
    var circleGroup = draw.group();

    var arrowLineElem1 = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        elm: null,
    };

    var arrowLineElem2 = {
        x1: 0,
        y1: 0,
        x2: 0,
        y2: 0,
        elm: null,
    };

    var arrowCoords = {
        x: circleRadius,
        y: circleRadius,
        dir: 2,
        elm: null
    }

    var coordsLine1 = {
        x1: circleRadius,
        y1: circleRadius,
        x2: widthLine1,
        y2: circleRadius
    }

    var coordsLine2 = {
        x1: widthLine1,
        y1: circleRadius,
        x2: widthLine1,
        y2: heightLine2 - circleRadius
    }

    var coordsLine3 = {
        x1: widthLine1,
        y1: heightLine2 - circleRadius,
        x2: widthLine1 + widthLine3,
        y2: heightLine2 - circleRadius
    }

    var coordsLine4 = {
        x1: widthLine1 + widthLine3,
        y1: heightLine2 - circleRadius,
        x2: widthLine1 + widthLine3,
        y2: h - circleRadius - heightLine4_6
    }

    var coordsLine5 = {
        x1: widthLine1 + widthLine3,
        y1: h - circleRadius - heightLine4_6,
        x2: widthLine1 + widthLine3 + widthLine5,
        y2: h - circleRadius - heightLine4_6
    }

    var coordsLine6 = {
        x1: widthLine1 + widthLine3 + widthLine5,
        y1: h - circleRadius - heightLine4_6,
        x2: widthLine1 + widthLine3 + widthLine5,
        y2: h - circleRadius
    }

    var coordsLine7 = {
        x1: widthLine1 + widthLine3 + widthLine5,
        y1: h - circleRadius,
        x2: widthLine1 + widthLine3 + widthLine5 + widthLine7,
        y2: h - circleRadius
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
        for(var i = 1; i < defaultSettings.widthLine; i++){
            var j = arrow.length - i;
            var part = arrow[j];
            var partArrow = {
                x: part.x - xdir,
                y: part.y - ydir,
            }
            arrow.unshift(partArrow);
        }
    };

    function updateLine(){
        var head = getHeadArrow();
        arrow.shift();
        head.x += xdir;
        head.y += ydir;
        arrow.push(head);
    }

    function drawArrow() {
        context.fillStyle = 'red';
        console.log(arrow);
        for (var i = 0; i < arrow.length; i++) {
            console.log(arrow[i].x);
            context.beginPath();
            context.moveTo(arrow[i].x, arrow[i].y);
            context.lineTo(arrow[i].x + 1, arrow[i].y);
            context.stroke();
            // context.fillRect(arrow[i].x, arrow[i].y, 1, 1);
        }
    };

    function getHeadArrow(){
        return clone(arrow[arrow.length - 1]);
    }

    function arrowLinesPos(){
        var head = getHeadArrow();

        if(arrowLineElem1.elm){
            arrowLineElem1.elm.remove();
        }
        arrowLineElem1.x1 = head.dir === 3 || head.dir === 1 ? head.x - weightArrow : head.x;
        arrowLineElem1.y1 = head.dir === 2 ? head.y - weightArrow : head.y;
        arrowLineElem1.x2 = head.dir === 2 ? head.x - widthArrowLine : head.dir === 3 ? head.x - widthArrowLine - weightArrow : head.dir === 1 ? head.x - widthArrowLine - weightArrow : head.x;
        arrowLineElem1.y2 = head.dir === 2 ? head.y - widthArrowLine - weightArrow : head.dir === 3 ? head.y - widthArrowLine : head.dir === 1 ? head.y + widthArrowLine : head.y;

        var line1 = draw.line(arrowLineElem1.x1, arrowLineElem1.y1, arrowLineElem1.x2, arrowLineElem1.y2)
                        .stroke({ color: '#FC273D', width: 2, linecap: 'round' }).attr('id', 'arrowLineElem1');
        lineArrowGroup.add(line1);
        arrowLineElem1.elm = line1;

        if(arrowLineElem2.elm){
            arrowLineElem2.elm.remove();
        }
        arrowLineElem2.x1 = head.dir === 3 || head.dir === 1 ? head.x + weightArrow : head.x;
        arrowLineElem2.y1 = head.dir === 2 ? head.y + weightArrow : head.y;
        arrowLineElem2.x2 = head.dir === 2 ? head.x - widthArrowLine : head.dir === 3 ? head.x + widthArrowLine + weightArrow : head.dir === 1 ? head.x + widthArrowLine + weightArrow : head.x;
        arrowLineElem2.y2 = head.dir === 2 ? head.y + widthArrowLine + weightArrow : head.dir === 3 ? head.y - widthArrowLine : head.dir === 1 ? head.y + widthArrowLine : head.y;

        var line2 = draw.line(arrowLineElem2.x1, arrowLineElem2.y1, arrowLineElem2.x2, arrowLineElem2.y2)
                        .stroke({ color: '#FC273D', width: 2, linecap: 'round' }).attr('id', 'arrowLineElem1');;
        lineArrowGroup.add(line2);
        arrowLineElem2.elm = line2;
    };

    function drawLine(x1, y1, x2, y2, lineWidth, color){
        var line = draw.line(x1, y1, x2, y2);
        line.stroke({
            color: color || 'rgba(255, 100, 75)',
            width: lineWidth || 1,
            linecap: 'round'
        });
        lineSkeletonGroup.add(line);
        return line;
    }

    function drawCircle(x, y, r){
        var circle = draw.circle(r).fill('white').move(x, y);
        circleGroup.add(circle)
    }

    // function drawArrow(){
    //     for(var i = arrow.length - 1; i >= 0; --i){
    //         var prev = arrow[i - 1];
    //         var current = arrow[i];
    //         if(typeof prev !== 'undefined'){
    //             current.x = prev.x;
    //             current.y = prev.y;
    //             current.dir = arrow[i - 1].dir;
    //         }
    //         current.elm.move(current.x, current.y);
    //     }
    //     arrowLinesPos();
    // }

    function compare(a, b, step){
        return a >= b - step / 2 && a <= b + step / 2;
    }

    function drawSkeleton(){
        drawLine(coordsLine1.x1, coordsLine1.y1, coordsLine1.x2, coordsLine1.y2);
        drawLine(coordsLine2.x1, coordsLine2.y1, coordsLine2.x2, coordsLine2.y2);
        drawLine(coordsLine3.x1, coordsLine3.y1, coordsLine3.x2, coordsLine3.y2);
        drawLine(coordsLine4.x1, coordsLine4.y1, coordsLine4.x2, coordsLine4.y2);
        drawLine(coordsLine5.x1, coordsLine5.y1, coordsLine5.x2, coordsLine5.y2);
        drawLine(coordsLine6.x1, coordsLine6.y1, coordsLine6.x2, coordsLine6.y2);
        drawLine(coordsLine7.x1, coordsLine7.y1, coordsLine7.x2, coordsLine7.y2);
        drawCircle(coordsLine1.x1 - circleRadius, coordsLine1.y1 - circleRadius, circleRadius * 2);
        drawCircle(coordsLine3.x1 - circleRadius, coordsLine3.y1 - circleRadius, circleRadius * 2);
        drawCircle(coordsLine5.x1 - circleRadius, coordsLine5.y1 - circleRadius, circleRadius * 2);
        drawCircle(coordsLine7.x1 - circleRadius, coordsLine7.y1 - circleRadius, circleRadius * 2);
    }

    function drawAll(){
        var head = getHeadArrow();
        console.log(1);
        if(compare(head.x, coordsLine1.x2, step) && compare(head.y, coordsLine1.y2, step)){
            head.dir = 3;
        }
        if(compare(head.x, coordsLine2.x2, step) && compare(head.y, coordsLine2.y2, step)){
            head.dir = 2;
        }
        if(compare(head.x, coordsLine3.x2, step) && compare(head.y, coordsLine3.y2, step)){
            head.dir = 1;
        }
        if(compare(head.x, coordsLine4.x2, step) && compare(head.y, coordsLine4.y2, step)){
            head.dir = 2;
        }
        if(compare(head.x, coordsLine5.x2, step) && compare(head.y, coordsLine5.y2, step)){
            head.dir = 3;
        }
        if(compare(head.x, coordsLine6.x2, step) && compare(head.y, coordsLine6.y2, step)){
            head.dir = 2;
        }
        if(compare(head.x, coordsLine7.x2, step) && compare(head.y, coordsLine7.y2, step)){
            head.dir = 2;
            head.x = circleRadius;
            head.y = circleRadius;
        }

        if(head.dir === 1){
            head.y -= step;
        }
        else if(head.dir === 2){
            head.x += step;
        }
        else if(head.dir === 3){
            head.y += step;
        }

        drawArrow();
    }

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

    function engineStart(callback){
        if(typeof callback == 'undefined'){
            callback = drawAll;
        }
        engine = callback;
        engineStep();
    }

    function engineStep(){
        engine();
        nextStep(engineStep);
    };

    this.run = function(){
        defaultPosArrow();
        drawArrow();
        // fillArrow();
        // arrowPos();
        // drawSkeleton();
        // engineStart();
    }
};

var line = new RunningArrow('line-img');
line.run();
