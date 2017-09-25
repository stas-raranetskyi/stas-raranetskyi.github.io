function Editor () {

	var cellW = cellSize.w,
		cellH = cellSize.h,
		cursorPos = point(),
		tiles = [],
		type = 0;

	var moveCamera = function(){
		if(key.isDown('A')){
			camera.move(point(-5,0));
		}
		else if(key.isDown('D')){
			camera.move(point(5,0));
		}
		else if(key.isDown('W')){
			camera.move(point(0,-5));
		}
		else if(key.isDown('S')){
			camera.move(point(0,5));
		}
	};
	
	var updateCursor = function(cursor){
		cursorPos.x = Math.floor(cursor.x / cellW) * cellW;
		cursorPos.y = Math.floor(cursor.y / cellH) * cellH;
	};

	var drawCell = function(){

		brush.drawRect({
			x: cursorPos.x,
			y: cursorPos.y,
			w: cellW,
			h: cellH,
			strokeColor: '#ff0000',
			strokeWidth: 1
		});

	};

	var addTile = function(){
		if(!type){
			tiles.push(game.newRectObject({
				x: cursorPos.x,
				y: cursorPos.y,
				w: cellW,
				h: cellH,
				fillColor: pjs.colors.randomColor(0,255)
			}));
		}
	};

	var drawTiles = function(){
		OOP.forArr(tiles,function(el, id){
			el.draw();
			if(mouse.isPeekObject('RIGHT', el)){
				return tiles.splice(id,1);
			}
		});
	}

	this.update = function(){
		game.clear();
		updateCursor(mouse.getPosition());
		moveCamera();
		drawCell();
		drawTiles();
		if(mouse.isPress('LEFT')){
			addTile();
		}
	};
	
}

var editor = new Editor();

game.newLoopFromClassObject('editor', editor);