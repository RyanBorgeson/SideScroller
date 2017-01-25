/*
 * Simple monster entity:
 * - Moves side to side, and changes direction when it hits something
 * - Is affected by gravity
 * - Hurts the player if touched, unless if hit on top, which kills the monster
 */

registerEntity(Monster, '@'); //associate the '@' symbol with this entity

function Monster(x, y) { 
	this.x = x;
	this.y = y;
	this.width = assets["monster"].spriteWidth; //set the width
	this.height = assets["monster"].spriteHeight; //set the height
	this.physicsPriority = 50;
	this.dx = 3*60; //default horizontal speed is 3px/sec to the right
	this.dy = 0;
}

Monster.prototype.update = function(deltaTime) {
	this.dy += GRAVITY * deltaTime;
}

Monster.prototype.processCollisionWith = function(obj, side) {
	if(obj.physicsPriority) { //if it hits something solid
		if((side == Collision.LEFT && this.dx<0) || (side == Collision.RIGHT && this.dx>0)){ //if it hit the solid object from the left or right side (and moving in that direction)
			this.dx *= -1; //change horizontal direction by multiplying the speed by -1
		} else if(side == Collision.BOTTOM || side == Collision.TOP) { //if it hit the solid object from the top or bottom
			this.dy = 0; //stop vertical movement
		}
	}
	if(obj instanceof Player) { //if the object it hit is the player
		if(side == Collision.TOP) { //if the top of the monster was hit
			hud.score += 100; //increase player score
			world.remove(this); //kill the monster by removing it from the world
		}
		else //if the player hit it from a side other than the top
			obj.hurt(1); //hurt the player by 1 HP
	}
}

Monster.prototype.render = function() {
	drawSprite(assets["monster"],
			0,0,
			this.x, this.y,
			this.width, this.height);
}
