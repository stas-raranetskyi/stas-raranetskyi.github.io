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

