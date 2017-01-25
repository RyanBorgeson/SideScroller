var loadRemaining; //how many items remain to be loaded
var assets; //map of assets that have been loaded

//loading game state (while assets are being downloaded)
gameStates["Preload"] = {
	init: function(){
		assets = {
			//list the assets to load here
			"logo": loadImage("logo.jpg"),
			"goal": loadImage("goal.png"),
			"monster": loadImage("monster.png"),
			"player": loadImage("player.png", 1,9),
			"hurt": loadSound("hurt.ogg"),
			"spikes": loadImage("spikes.png"),
			"coin": loadImage("coin.png",1,4),
			"pickup": loadSound("coin.ogg"),
			"wall": loadImage("wall.png")
		};
		loadRemaining = Object.keys(assets).length;
	},
	update: function() {
		if (loadRemaining <= 0) {
			switchGameState("Title") //transition to the title state once all the pending assets to load have been loaded
		}
	},
	render: function() {
		//render simple text of the loading progress
		context.font = "40px Arial";
		context.textBaseline = "top";
		context.textAlign = "center";
		context.fillStyle = "white";
		context.fillText("Loading assets... please wait", appWidth/2, 140);
		var total = Object.keys(assets).length;
		var loaded = total - loadRemaining;
		context.fillText(Math.floor(100*loaded/total) + "%", appWidth/2, 230);
	}
};
