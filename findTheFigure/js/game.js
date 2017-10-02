
function randomArr(min, max, l){

  var arr = [],
    m = [],
    n = 0,
    i;

    if (max - min < l - 1) return;

    for (i = 0; i <= (max - min); i++){
      m[i] = i + min;
    }

    for (i = 0; i < l; i++) {
      n = Math.floor(Math.random() * (m.length)); 
      arr.push(m.splice(n, 1)[0]);
    };

    return arr;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

var Game = function(){

	var sizeFacet = parseInt(width / 8);
	var objFigure = {
		0: game.newRectObject({
			w: sizeFacet,
			h: sizeFacet,
			fillColor: '#ffffff',
			userData: {
				number: 1
			}
		}),
		1: game.newTriangleObject({
			w: sizeFacet,
			h: sizeFacet,
			fillColor: '#ffffff',
			userData: {
				number: 2
			}
		}),
		2: game.newEllipsObject({
			w: sizeFacet,
			h: sizeFacet,
			fillColor: '#ffffff',
			userData: {
				number: 3
			}
		}),
		3: game.newRectObject({
			w: sizeFacet,
			h: sizeFacet / 2,
			fillColor: '#ffffff',
			userData: {
				number: 4
			}
		})
	}

	var countFigures,
		arrFiguresRand,
		arrFiguresRandPos,
		figureRand,
		centerFigureRand,
		answer,
		score = 0;

	var refreshData = function(){

		countFigures = Object.keys(objFigure).length - 1,
		arrFiguresRand = randomArr(0,countFigures,4),
		arrFiguresRandPos = randomArr(0,3,4),
		figureRand = getRandomInt(0,4),
		answer = false;

		arrFiguresRand.forEach(function(id, i){
			var figure = objFigure[id];

			if(arrFiguresRandPos[i] == 0){
				objFigure[id].x = width / 2 - figure.w / 2;
				objFigure[id].y = 0;
			}
			else if(arrFiguresRandPos[i] == 1){
				objFigure[id].x = width - figure.w;
				objFigure[id].y = height / 2 - figure.h / 2;
			}
			else if(arrFiguresRandPos[i] == 2){
				objFigure[id].x = width / 2 - figure.w / 2;
				objFigure[id].y = height - figure.h;
			}
			else if(arrFiguresRandPos[i] == 3){
				objFigure[id].x = 0;
				objFigure[id].y = height / 2 - figure.h / 2;
			}
			objFigure[id].pos = arrFiguresRandPos[i];

		});

		centerFigureRand = OOP.clone(objFigure[arrFiguresRand[figureRand]]);
		centerFigureRand.x = width / 2 - centerFigureRand.w / 2;
		centerFigureRand.y = height / 2 - centerFigureRand.h / 2;

	};

	refreshData();
		
	this.update = function(){

		game.clear();

		var refresh = false;
		if(key.isPress('UP')){
			if(centerFigureRand.pos == 0 && !answer){
				refresh = true;
			}
			else{
				score--;
			}
		}
		else if(key.isPress('RIGHT')){
			if(centerFigureRand.pos == 1 && !answer){
				refresh = true;
			}
			else{
				score--;
			}
		}
		else if(key.isPress('DOWN')){
			if(centerFigureRand.pos == 2 && !answer){
				refresh = true;
			}
			else{
				score--;
			}
		}
		else if(key.isPress('LEFT')){
			if(centerFigureRand.pos == 3 && !answer){
				refresh = true;
			}
			else{
				score--;
			}
		}

		if(score < 0){
			score = 0;
		}

		if(refresh){
			score++;
			answer = true;
			refreshData();
		}

		arrFiguresRand.forEach(function(id, i){

			objFigure[id].draw();

		});

		centerFigureRand.draw();

		brush.drawTextS({
			text: ' Score: ' + score,
			size: 30,
			color: '#ffffff',
			strokeColor: '#ffffff',
			strokeWidth: 1,
			x: 10, 
			y: 10
		});

	}

};

game.newLoopFromClassObject('Game', new Game());