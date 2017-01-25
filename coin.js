/* 
 * Coin entity:
 * - Includes simple animation
 * - When the player hits it, it is picked up, plays a sound, and increases the player's score
 */

registerEntity(Coin, 'o'); //associate the Coin entity with a 'o' in level data

//constructor
function Coin(x, y) { 
	this.x = x;
	this.y = y;
	this.width = 16; //set the coin width
	this.height = 16; //set the coin height
	this.animationFrame = 0;
}

Coin.prototype.update = function(deltaTime) {
	this.animationFrame += 10 * deltaTime;
	if(this.animationFrame >= assets["coin"].columns)
		this.animationFrame -= assets["coin"].columns;
}

Coin.prototype.processCollisionWith = function(obj, side) {
	if(obj instanceof Player) { //when colliding with the player (from any side)
		playSound(assets["pickup"]); //play the sound we loaded
		world.remove(this); //remove the coin from the world
		hud.score += 10; //add to the player's score
	}
}

Coin.prototype.render = function() {
	drawSprite(assets["coin"],
			0,this.animationFrame,
			this.x, this.y,
			this.width, this.height);
}