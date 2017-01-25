function Button(text, x, y, width, height, action, key) {
	this.text = text;
	this.x = x;
	this.y = y;
	this.width = width,
	this.height = height
	this.action = action;
	this.key = key;
	this.font = "32px Impact";
	this.pressed = false;
}

Button.prototype.update = function(deltaTime) {
	this.pressed = cursor.isPressed && checkForCollision(this, cursor.position);
	if((cursor.wasClicked && checkForCollision(this, cursor.position))
		|| (this.key && key.wasPressed[this.key]))
		this.action.call();
}

Button.prototype.render = function() {
	
	if(this.pressed)
		context.fillStyle = "black";
	else
		context.fillStyle = "white";
	context.strokeStyle = "grey";
	context.fillRect(this.x, this.y, this.width, this.height);
	context.font = this.font;
	context.textBaseline = "middle";
	context.textAlign = "center";
	if(this.pressed)
		context.fillStyle = "white";
	else
		context.fillStyle = "black";
	context.fillText(this.text, this.x + this.width/2, this.y + this.height/2);
}
