
var MyGame = function(){

	var userLevel = getCookie('userLevel'),
		map = userLevel ? LEVELS[userLevel - 1] : LEVELS[level - 1],
		walls = [],
		cells = [],
		waters = [],
		enemys = [],
		checkPoints = [],
		plStartPos = false,
		save = false,
		lastScore = 0,
		overLavel,
		player = game.newImageObject({
			file: images.ball,
			w: cellSize.w - 10,
			h: cellSize.w - 10,
			fillColor: '#ff9191',
			position: point(0,0)
		});

	var restartGame = function(){
		player.setPositionC(plStartPos);
		camera.setPositionC(plStartPos);
		if(!save){
			score = 0;
		}else{
			score = lastScore;
		}
	}

	var nextLevel = function(){
		level++;
		map = LEVELS[level - 1];
	};

	this.entry = function(){

		walls = [];
		cells = [];
		waters = [];
		enemys = [];
		checkPoints = [];
		score = 0;

		OOP.forArr(map.source,function(string, Y){
			OOP.forArr(string,function(symbol, X){
				if(!symbol || symbol == '' || symbol == ' '){
					return;
				}
				if(symbol == '0'){
					walls.push(game.newImageObject({
						file: images.block,
						w: map.width,
						h: map.height,
						x: map.width * X,
						y: map.height * Y,
					}));
				}
				else if(symbol == '/'){
					walls.push(game.newImageObject({
						file: images.blockAngle,
						w: map.width,
						h: map.height,
						x: map.width * X,
						y: map.height * Y,
						userData: {
							speedY: -1
						}
					}));
				}
				else if(symbol == '\\'){
					walls.push(game.newImageObject({
						file: images.blockAngle,
						w: map.width,
						h: map.height,
						x: map.width * X,
						y: map.height * Y,
						userData: {
							speedY: 1
						}
					}));
				}
				else if(symbol == '|'){
					cells.push(game.newImageObject({
						file: images.cell,
						w: map.width / 4,
						h: map.height,
						x: map.width * X + map.width / 3,
						y: map.height * Y,
						userData: {
							active: true
						}
					}));
				}
				else if(symbol == '-'){
					cells.push(game.newImageObject({
						file: images.cell,
						w: map.width,
						h: map.height / 4,
						x: map.width * X,
						y: map.height * Y + map.height / 3,
						ange: 90,
						userData: {
							active: true
						}
					}));
				}
				else if(symbol == 'W'){
					waters.push(game.newRectObject({
						w: map.width,
						h: map.height,
						x: map.width * X,
						y: map.height * Y,
						fillColor: '#084379',
						alpha: 0.4
					}));
				}
				else if(symbol == 'P'){
					plStartPos = point(map.width * X, map.height * Y);
				}
				else if(symbol == 'E'){
					enemys.push(game.newImageObject({
						file: images.enemy1,
						w: map.width / 4,
						h: map.height,
						x: map.width * X + map.width / 3,
						y: map.height * Y,
					}));
				}
				else if(symbol == '*'){
					enemys.push(game.newImageObject({
						file: images.enemy2,
						w: map.width,
						h: map.height,
						x: map.width * X,
						y: map.height * Y,
						userData: {
							mp: point(map.width * X, map.height * Y)
						}
					}));
				}
				else if(symbol == 'F'){
					checkPoints.push(game.newImageObject({
						file: images.flag,
						w: map.width,
						h: map.height * 2,
						x: map.width * X,
						y: map.height * Y - map.height,
						userData: {
							active: true
						}
					}));
				}
				else if(symbol == 'X'){
					overLavel = game.newImageObject({
						file: images.door,
						w: map.width,
						h: map.height * 2,
						x: map.width * X,
						y: map.height * Y - map.height
					});
				}
			});
		});

		player.gr = 0.5;
		player.speed = point(0,0);
		if(plStartPos){
			player.setPositionC(plStartPos);
		}

	};


	this.update = function(){
		game.clear();

		player.draw();
		player.speed.y += player.gr;
		if(key.isDown('RIGHT')){
			player.speed.x = 5;
		}
		else if(key.isDown('LEFT')){
			player.speed.x = -5;
		}
		else{
			player.speed.x = 0;
		}
		OOP.drawArr(walls, function(wall, id){

			if(wall.isInCameraStatic()){
				if(wall.speedY > 0){
					wall.setFlip(point(1,0));
				}

				//wall.drawStaticBox();
				if(wall.isStaticIntersect(player)){
					if(wall.speedY){
						player.speed.x = math.toZiro(player.speed.x, 0.1);
						if(player.getDistanceC(wall.getPositionC()) < 40){
							player.speed.y = wall.speedY * player.speed.x
						}
						return;
					}

					if(player.x + player.w > wall.x + wall.w / 4 && player.x < wall.x + wall.w - wall.w / 4){
						if(player.speed.y > 0 && player.y + player.h < wall.y + wall.h / 2){
							if(key.isDown('UP')){
								player.speed.y = -12;
							}
							else{
								player.y = wall.y - player.h;
								player.speed.y *= -0.3;
								if(player.speed.y > -0.4){
									player.speed.y = 0;
								}
							}
						}
						else if(player.speed.y < 0 && player.y > wall.y + wall.h / 2){
							player.y = wall.y + wall.h;
							player.speed.y *= -0.1;
						}
					}

					if(player.y + player.h > wall.y + wall.h / 4 && player.y < wall.y + wall.h - wall.h / 4){
						if(player.speed.x > 0 && player.x + player.w < wall.x + wall.w / 2){
							player.x = wall.x - player.w;
							player.speed.x = 0;
						}
						else if(player.speed.x < 0 && player.x > wall.x + wall.w / 2){
							player.x = wall.x + wall.w;
							player.speed.x = 0;
						}
					}
				}
			}
		});

		OOP.drawArr(cells, function(cell, id){
			if(cell.isInCameraStatic() && cell.isStaticIntersect(player) && cell.active){
				score++;
				cell.active = false;
				cell.setImage(images.cell2);
			}
		});

		var onWater = false;

		OOP.drawArr(waters, function(water, id){

			if(water.isInCameraStatic() && water.isStaticIntersect(player) && player.y + player.h / 2 > water.y){
				player.speed.y -= 0.8;
				onWater = true;
			}

		});

		OOP.drawArr(enemys, function(enemy, id){

			if(enemy.mp){
				enemy.motion(enemy.mp, pjs.vector.size(map.width * 2.5, 0), 2);
			}

			if(enemy.isInCameraStatic() && enemy.isStaticIntersect(player)){
				restartGame();
			}

		});

		OOP.drawArr(checkPoints, function(checkPoint, id){

			if(checkPoint.isInCameraStatic() && checkPoint.isStaticIntersect(player)){
				save = true;
				lastScore = score;
				plStartPos = checkPoint.getPositionC();
			}

		});

		overLavel.draw();

		if(overLavel.isInCameraStatic() && overLavel.isStaticIntersect(player)){
			nextLevel();
			setCookie('userLevel',level,{
				path: '/'
			});
			game.setLoop('myGame');
		}
		
		if(player.speed.y){
			player.y += player.speed.y;
		}
		if(player.speed.x){
			player.turn(player.speed.x);
			player.x += player.speed.x;
		}

		brush.drawTextS({
			text: 'Score: ' + score,
			size: 30,
			color: '#ffffff',
			strokeColor: '#002c5d',
			strokeWidth: 1,
			x: 10, 
			y: 10
		});

		camera.follow(player, 50);

		if(key.isDown('ESC')){
			//game.stop();
			game.startLoop('menu');
		}

	}

};


var myGame = new MyGame();

game.newLoopFromClassObject('myGame', myGame);