/*
 * Player entity:
 * More complex, as it handles respawning, damage, and player control/interactions
 */

registerEntity(Player, 'P'); //associate "P" with this entity

const MAX_PLAYER_SPEED = 250; //define the speed the player can move at

function Player(x, y) { 
	this.x = x;
	this.y = y;
	this.width=16; //set the width
	this.height=20; //set the height
	this.maxHealth = 5; //set the maximum number of hit points
	this.physicsPriority = 100;
	this.setSpawn(this.x, this.y); //store the current x/y position as where the player will respawn
	this.respawn(); //initialize other player attributes by "respawning" the player
}

//define a function to store away a position for the player to spawn later
Player.prototype.setSpawn = function(x,y) {
	this.spawnX = x;
	this.spawnY = y;
}

//reset certain player variables when respawning
Player.prototype.respawn = function() {
	this.x = this.spawnX; //reset position to the spawn position
	this.y = this.spawnY;
	this.health = this.maxHealth; //reset health to the max health
	hud.health = 1.0;
	this.dx = 0; //reset speed to 0
	this.dy = 0;
	this.onGround = false; //assume not on ground
	this.safeCount=0; //not invincible/safe
}

Player.prototype.hurt = function (dmg) {
	if(this.safeCount <=0 && this.health > 0) { //if not invincible and we still have health to lose
		playSound(assets["hurt"]); //play the hurt sound
		this.safeCount += 2; //make player invincible for 2 seconds
		this.health -= dmg; //reduce player health by the specified amount
		if (this.health <= 0) { //if all health is lost (dead)
			this.health=0; //ensure health displayed isn't negative
			hud.playerLives--; //decrease player life count
		}
		hud.health = this.health/this.maxHealth;
	}
}

Player.prototype.update = function(deltaTime) {
	if (this.health > 0) { //only allow movement if alive
		var acceleration;
		if(this.onGround)
			acceleration = 10800;
		else
			acceleration = 3600;
		//move left/right
		if (key.isDown[KEY_LEFT] && key.isDown[KEY_RIGHT]) {
			//ignore movement if both left and right are pressed
		}
		else if (key.isDown[KEY_LEFT]) {
			//accelerate left
			this.dx = Math.max(-MAX_PLAYER_SPEED, this.dx - acceleration * deltaTime);
		}
		else if (key.isDown[KEY_RIGHT]) {
			//accelerate right
			this.dx = Math.min(MAX_PLAYER_SPEED, this.dx + acceleration * deltaTime);
		}
		
		if (this.onGround && key.isDown[KEY_UP]){ //on press of UP when on the ground
			//jump by no longer being on the ground and setting vertical speed
			this.onGround = false;
			this.dy = -500;
		}
		
		if (this.y > world.view.height)
		{
			//die if fall off of the bottom of the world
			this.hurt(this.health+1);
		}
	} else { //(player is dead)
		if (key.wasPressed[KEY_SPACE]){ //when the SPACE key is pressed
			if(hud.playerLives > 0) //when lives remain, respawn
				this.respawn();
			else //otherwise, no lives remain, so go to game over
				switchGameState('Game over');
		}
	}
	
	//shorten the time the player is invincible due to damage as time passes
	this.safeCount -= deltaTime;
	if(this.safeCount < 0)
		this.safeCount = 0;
	
	this.dx *= (1-3*deltaTime); //dampen the horizontal speed to simulate friction
	this.dy += GRAVITY * deltaTime; //apply gravity
	world.view.centerOn(this.x, this.y); //move the viewport's scrolling to center on the player's new position
	
	//figure out which sprite frame to display
	if(this.health<=0)
		this.animationFrame = 8; //dead
	else if(Math.abs(this.dx)<1) { //not moving a significant amount left or right
		if(this.onGround)
			this.animationFrame = 0; //standing
		else
			this.animationFrame = 1; //jumping up
	} else if(this.dx < 0) { //moving left
		if(this.onGround) {
			this.animationFrame = 5; //running left
			if(this.x % 20 < 10)
				this.animationFrame++; //based on player position toggle, between two running frames
		} else
			this.animationFrame = 7; //jumping left
	} else { //moving right
		if(this.onGround) {
			this.animationFrame = 2; //running right
			if(this.x % 20 < 10)
				this.animationFrame++; //based on player position toggle, between two running frames
		} else
			this.animationFrame = 4; //jumping rihgt
	}
	this.onGround = false;  //assume that the player won't be on the ground the next frame unless it collides with something (prevents in-air jumping)
}

Player.prototype.processCollisionWith = function(obj, side) {
	if(obj.physicsPriority) {
		if(side == Collision.LEFT || side == Collision.RIGHT)
			this.dx = 0; //limit horizontal speed if hitting an object from the left or right
		else if(side == Collision.BOTTOM) {
			//if the bottom of the player hit something solid, consider the player is on the ground (able to jump) and not falling
			this.onGround = true;
			this.dy = 0;
		}
		else if(side == Collision.TOP)
			this.dy = 0; //limit vertical speed if hitting player's head on something when jumping
	}
}

Player.prototype.render = function() {
	context.save();
	if(this.health > 0 && this.safeCount > 0 && (this.safeCount*8%1) < 0.25)
		context.globalAlpha = 0.25; //set the display transparency to 25% for portions of the time that a player is invincible (phasing)
	drawSprite(assets["player"],
			0,this.animationFrame,
			this.x, this.y,
			this.width, this.height);
	context.restore();
}
