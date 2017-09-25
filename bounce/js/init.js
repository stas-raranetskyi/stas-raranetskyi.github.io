var pjs = new PointJS(650, 500, {
	background: 'url(images/back.jpg) no-repeat',
	backgroundSize: 'cover'
});

pjs.system.initFullPage(); // for Full Page mode
//pjs.system.initFullScreen(); // for Full Screen mode (only Desctop)

var log    = pjs.system.log;     // log = console.log;
var game   = pjs.game;           // Game Manager
var point  = pjs.vector.point;   // Constructor for Point
var camera = pjs.camera;         // Camera Manager
var brush  = pjs.brush;          // Brush, used for simple drawing
var OOP    = pjs.OOP;            // Objects manager
var math   = pjs.math;           // More Math-methods
var levels = pjs.levels;         // Levels manager
var width  = game.getWH().w; // width of scene viewport
var height = game.getWH().h; // height of scene viewport

//pjs.system.setTitle('PointJS Game'); // Set Title for Tab or Window

var key   = pjs.keyControl.initKeyControl();
var mouse = pjs.mouseControl.initMouseControl();
// var touch = pjs.touchControl.initTouchControl();
// var act   = pjs.actionControl.initActionControl();

var score = 0;
var record = 0;
var level = 1;

var cellSize = {
	w: 50,
	h: 50
}

var images = {
	ball: 'images/ball.png',
	block: 'images/block.jpg',
	blockAngle: 'images/blockAngle.png',
	cell: 'images/cell.png',
	cell2: 'images/cell2.png',
	door: 'images/door.png',
	enemy1: 'images/enemy1.png',
	enemy2: 'images/enemy2.png',
	flag: 'images/flag.png',
}

// возвращает cookie с именем name, если есть, если нет, то undefined
function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}