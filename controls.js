//keyboard constants
const KEY_SPACE = 32;
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
const KEY_UP = 38;
const KEY_DOWN = 40;

//register keyboard/mouse listeners
var key = {
	isDown: [], //is a certain key currently pressed
	wasPressed: [] //was a key pressed and released
}
var cursor = {
	position: {x:0, y:0, width:1, height:1}, //current mouse position
	hasMoved: false, //has the mouse moved iin this frame
	isPressed: false, //is the mouse button currently pressed
	wasClicked: false //was the mouse pressed and released
};
function registerControls() {
	theCanvas.focus();
	
	//keyboard listeners
	theCanvas.addEventListener("keydown", 
		function (event) {
			//console.log("key down: " + event.keyCode);
			key.isDown[event.keyCode]=true;
			event.preventDefault();
		}
	);
	theCanvas.addEventListener("keyup", 
		function (event) {
			//console.log("key up (actve): " + event.keyCode);
			if(key.isDown[event.keyCode]);
				key.wasPressed[event.keyCode] = true;
			event.preventDefault();
		}
	);
	document.body.addEventListener("keyup", 
		function (event) {
			//console.log("key up (inactive): " + event.keyCode);
			delete key.isDown[event.keyCode];
		}
	);
	
	//mouse button/touch listeners
	function mouseDown(event) {
		//console.log("mouse down");
		cursor.isPressed = true;
		mouseMove(event);
	}
	theCanvas.addEventListener("mousedown", mouseDown);
	theCanvas.addEventListener("touchstart", mouseDown);
	function mouseUpActive(event) {
		//console.log("mouse up (active)");
		if(cursor.isPressed)
			cursor.wasClicked = true;
	}
	function mouseUpInactive(event) {
		//console.log("mouse up (inactive)");
		cursor.isPressed = false;
		mouseMove(event);
	}
	theCanvas.addEventListener("mouseup", mouseUpActive);
	document.body.addEventListener("mouseup", mouseUpInactive);
	theCanvas.addEventListener("touchend", mouseUpActive);
	document.body.addEventListener("touchend", mouseUpInactive);
	
	//mouse/touch movement listeners
	function mouseMove(event) {
		cursor.hasMoved = true;
		var x, y;
		if(event.touches) {
			x = event.touches[0].pageX;
			y = event.touches[0].pageY;
		}
		else {
			x = event.clientX;
			y = event.clientY;
		}
		var bounds = theCanvas.getBoundingClientRect();
		cursor.position.x = Math.min(Math.max(0, 
			x - bounds.left), appWidth);
		cursor.position.y = Math.min(Math.max(0, 
			y - bounds.top), appHeight);
		//console.log("mouse at (" + 
		//	cursor.position.x + ", " + cursor.position.y + ")");
	}
	document.addEventListener("mousemove", mouseMove);
	document.addEventListener("touchmove", mouseMove);
}