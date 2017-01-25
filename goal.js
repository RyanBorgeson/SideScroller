/*
 * Goal entity:
 * When the player presses SPACE over this, the next level will be triggered
 */

registerEntity(Goal, '!'); //associate the Goal entity with '!'

function Goal(x, y) { 
	this.x = x;
	this.y = y;
	this.width = TILESIZE; //set the width
	this.height = TILESIZE; //set the height
}

Goal.prototype.update = function(deltaTime) {
}

Goal.prototype.processCollisionWith = function(obj, side) {
	if(obj instanceof Player) { //if the player touches the goal...
		if (key.wasPressed[KEY_SPACE]==true){ //and presses SPACE...
			startLevel(levelNum+1);
		}
	}
}

Goal.prototype.render = function() {
	drawSprite(assets["goal"],
			0,0,
			this.x, this.y,
			this.width, this.height);
}
