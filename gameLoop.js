//This file handles the various screen states and transitioning between them
var lastFrameTime = performance.now();

//main game loop
function runGame(){
	//request another frame to be drawn after this one
	requestAnimationFrame(runGame);

	//compute framerate (default is 60 FPS)
	var now = performance.now();
	var deltaTime = Math.min((now - lastFrameTime)/1000, 1/20);
	deltaTime *= 1.0; //optional time scaling (speed up/slow down)
	
	lastFrameTime = now;
	
	//process updates to the game state based on inputs and time
	currentGameState.update(deltaTime);
	
	// clear the previous frame's image
	context.clearRect(0, 0, appWidth, appHeight);
	
	//draw the updated game state
	currentGameState.render();
	
	//reset control events as needed
	key.wasPressed = [];
	cursor.wasClicked = false;
	cursor.hasMoved = false;
}


//stores the current screen states
var currentGameState;
var gameStates = [];

//handles switching to a different screen state
function switchGameState(newState) {
	console.log("Changing gamestate to "+newState);
	
	if (!gameStates[newState]) //check if the new state is something valid
		console.warn("Unknown gamestate "+newState); //if not found, issue an error
	else
		currentGameState=gameStates[newState]; //if found, change our gameloop function to the new state
	
	currentGameState.init(); //call any initialization function on the new state before updating/rendering it
}
