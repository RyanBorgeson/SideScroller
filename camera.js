//Viewport camera

//Create a viewport that scrolls/zooms a scene of the specified size
function Camera(width, height)
{
	this.centerX = width/2;
	this.centerY = height/2;
	this.zoom = 1.0;
	this.width = width;
	this.height = height;
}

//Render the world, scrolled/zoomed to the position we're centered on
//Call with a function that renders the objects that are in the world
Camera.prototype.render = function(objRenderer)
{
	context.save();
	//set up the scroll/zoom parameters
	context.translate(appWidth/2, appHeight/2);
	context.scale(this.zoom, this.zoom);
	context.translate(-this.centerX, -this.centerY);
	objRenderer.call();
	context.restore();
}

//Moves the center point of the view to (x,y) 
Camera.prototype.centerOn = function(x,y)
{
	this.centerX = Math.max(Math.min(x, this.width - appWidth/2/this.zoom), appWidth/2/this.zoom);
	this.centerY = Math.max(Math.min(y, this.height - appHeight/2/this.zoom), appHeight/2/this.zoom);
}

//Sets the zoom level in percent (1.0 = 100%, 0.75 = 75%, 1.5 = 150%, etc)
Camera.prototype.setZoom = function(level)
{
	this.zoom = level;
	this.centerOn(this.centerX, this.centerY);
}
