var pjs = new PointJS(500, 500, {
	backgroundColor: '#000000'
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