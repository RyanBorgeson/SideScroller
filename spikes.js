/*
 * Spikes:
 * Simple enemy that hurts the player if touched
 */

registerEntity(Spikes, '^'); //associate '^' with this entity

function Spikes(x, y) { 
	this.x = x;
	this.y = y;
	this.width = TILESIZE; //set the width
	this.height = TILESIZE; //set the height
}

Spikes.prototype.processCollisionWith = function(obj, side) {
	if(obj instanceof Player) { //if the player touches it (from any side)
		obj.hurt(1); //hurt the player by 1 HP
	}
}

Spikes.prototype.update = function(deltaTime) {
}

Spikes.prototype.render = function() {
	drawSprite(assets["spikes"],
			0,0,
			this.x, this.y,
			this.width, this.height);
}