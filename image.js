//Call this to load an image file
function loadImage(url, rows, columns) {
	console.log("Loading image: "+url);
	if(!rows) rows = 1;
	if(!columns) columns = 1;
	
	var img = new Image();
	img.rows = rows;
	img.columns = columns;
	
	img.onload = function itemLoaded(event) {
		console.log("Loaded " + url);
		loadRemaining--;
		img.spriteHeight = img.height/img.rows;
		img.spriteWidth = img.width/img.columns;
	};
	img.onerror = function(event) {
		console.warn("Failed to load asset: " + url);
		loadRemaining--;
	}
	
	img.src = url;
	return img;
}

//draws the (row, column) sprite of the specified image at (x,y) with (width x height) size
function drawSprite(img, row,column, x,y, width,height) {
	//set default parameters if not specified
	if(!row) row = 0;
	if(!column) column = 0;
	if(!x) x = 0;
	if(!y) y = 0;
	if(!width) width = img.spriteWidth;
	if(!height) height = img.spriteHeight;
	
	var sourceX=Math.floor(Math.floor(column) * img.spriteWidth); //get the horizontal offset into the image to grab the frame
	var sourceY=Math.floor(Math.floor(row) * img.spriteHeight); //get the vertical  offset into the image to grab the frame
	
	context.drawImage(img, //draw the image...
		sourceX, sourceY, //...cropping it to the desired sprite...
		Math.floor(img.spriteWidth),Math.floor(img.spriteHeight), //...where the sprite is this size
		Math.floor(x), Math.floor(y), //draw it at this position
		Math.floor(width),Math.floor(height) //...with the specified size
	);
};

//load a special image that will be used as the mouse cursor
function loadCursor(url, x,y) {
	var img = loadImage(url);
	img.hotSpotX = x;
	img.hotSpotY = y;
}

//sets/clears the cursor image
function setCursor(image) {
	if(!image)
		delete theCanvas.style.cursor;
	else
		theCanvas.style.cursor =  "url("+image.src+") "+
			image.hotSpotX+" "+
			image.hotSpotY+
			", auto";
}