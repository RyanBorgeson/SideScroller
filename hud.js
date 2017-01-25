function Hud() {
	this.score=0; //zero out the score
	this.playerLives=3; //init the life counter
	this.health = 1.0;
}

Hud.prototype.render = function() {
	//background bar
	context.globalAlpha = 0.5;
	context.fillStyle = "#000000";
	context.strokeStyle = '#ffffff';
	context.fillRect(0,0, appWidth,25) ;
	context.strokeRect(0,0, appWidth,25) ;
	context.globalAlpha = 1.0;
	
	//score
	context.fillStyle = "white";
	context.font = '15px _sans';
	context.textBaseline = 'top';
	context.textAlign = 'left';
	context.fillText('Score: ' + this.score, 10, 5);
	
	//lives
	context.textAlign = 'right';
	context.fillText('Lives: ' + this.playerLives, appWidth-10, 5);
	
	//health
	context.textAlign = 'center';
	var percent = Math.floor(100.0*this.health)+'%';
	context.fillText('Health: ' + percent, appWidth/2,5);
}