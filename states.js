//This file handles the various screen states and transitioning between them

//title screen state
gameStates["Title"] = {
	init: function() {
		levelNum = 0;
		button = new Button("Start Game", innerWidth / 2 - 100,400, 200,50, 
			function() {
				switchGameState("Game");
			}, KEY_SPACE
		);
	},
	update: function(deltaTime) {
		button.update(deltaTime);
	},
	render: function() {
		
		context.drawImage(assets["ProjectTestRun"],
			(appWidth-assets["ProjectTestRun"].width)/2,
			75);
		
		button.render();
	}
};

var hud;
//game state that handles a level (see playfield.js)
gameStates["Game"] = {
	init: function(){
		hud = new Hud();
		startLevel(0);
	},
	update: function(deltaTime) {
		world.update(deltaTime);
	},
	render: function() {
		world.render();
		hud.render();
	}
};

//game state that handles the game over screen
gameStates["Game over"] = {
	init: function(){},
	update: function(deltaTime) {
		if (key.wasPressed[KEY_SPACE]){
			//when pressing SPACE, return to the title screen
			switchGameState('Title');
		}
	},
	render: function() {
		//display the score board, so the player can still see their score
		renderScoreBoard();
		//draw the game over text
		context.fillStyle = COLOR_WHITE;
		context.textBaseline = 'top';
		context.textAlign = 'center';
		context.font = '32px _sans';
		context.fillText("Game Over!", appWidth/2, appHeight/2);
		//display controls to return to the title screen
		context.font = '15px _sans';
		context.fillText("Press SPACE to return to the title screen", appWidth/2, appHeight/2+40);
	}
};
