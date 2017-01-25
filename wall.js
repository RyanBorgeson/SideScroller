/*
 * Wall:
 * Does nothing but prevent other entities from intersecting it
 */

registerEntity(Wall, 'X'); //associate 'X' with the entity

function Wall(x, y) { 
	this.x = x;
	this.y = y;
	this.width = TILESIZE; //set the width
	this.height = TILESIZE; //set the height
	this.physicsPriority = 999;
}

Wall.prototype.update = function(deltaTime) {
}

Wall.prototype.render = function() {
	drawSprite(assets["wall"],
			0,0,
			this.x, this.y,
			this.width, this.height);
}
