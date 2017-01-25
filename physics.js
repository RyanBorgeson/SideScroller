//get the distance between two objects
function distance(obj1, obj2) {
	return Math.sqrt(
		Math.pow(obj1.x-obj2.x, 2) + 
		Math.pow(obj1.y-obj2.y, 2)
	);
}

//define collision states
const Collision = {
	NONE: false,
	TOP: 'T',
	BOTTOM: 'B',
	LEFT: 'L',
	RIGHT: 'R',
	CORNER: 'C'
};

//gets the opposite collision side
function oppositeSide(side) {
	switch(side) {
		case Collision.TOP: return Collision.BOTTOM;
		case Collision.BOTTOM: return Collision.TOP;
		case Collision.LEFT: return Collision.RIGHT;
		case Collision.RIGHT: return Collision.LEFT;
		case Collision.CORNER: return Collision.CORNER;
		default: return Collision.NONE;
	}
}

const physicsStepSize = 10; //maximum number of pixels to increment physics by
function movePhysics(deltaTime, scene, obj) {
	if(obj == undefined)
		return;
	var index = scene.indexOf(obj);
	var dx = obj.dx ? (obj.dx * deltaTime) : 0;
	var dy = obj.dy ? (obj.dy * deltaTime) : 0;
	var newX = obj.x + dx;
	var newY = obj.y + dy;
	var steps = Math.sqrt(dx*dx+dy*dy) / physicsStepSize;
	var stopEarly = false;
	//stepwise increment position, checking for collisions along the way
	for(var i=0; i<Math.floor(steps) && !stopEarly; i++) {
		obj.x += dx/Math.floor(steps);
		obj.y += dy/Math.floor(steps);
		for(var j=scene.length-1; j>=index; j--) {
			if(j == index)
				continue;
			if(handleCollisionCallbacks(obj, scene[j])) {
				if(!allowOverlap(obj, scene[j]))
					stopEarly = true;
			}
		}
	}
	//if we haven't stopped by running into something, update the final position for the frame
	if(!stopEarly) {
		obj.x = newX;
		obj.y = newY;
		for(var j=scene.length-1; j>=index; j--) {
			if(j == index)
				continue;
			handleCollisionCallbacks(obj, scene[j]);
		}
	}
}

function allowOverlap(obj1, obj2) {
	return (obj1.physicsPriority == undefined) 
		|| (obj2.physicsPriority == undefined);
}

function checkForCollision(obj1, obj2) {
	if(obj1 == undefined || obj2 == undefined) //no collision if one or both objects have no physics data
		return false;
	
	var temp;
	var swapped = false;
	if(obj1.physicsPriority > obj2.physicsPriority) {
		temp = obj1;
		obj1 = obj2;
		obj2= temp;
		swapped = true;
	}
	
	var vX = (obj1.x + (obj1.width / 2)) - (obj2.x + (obj2.width / 2));
	var vY = (obj1.y + (obj1.height / 2)) - (obj2.y + (obj2.height / 2));
	
	var hWidths = (obj1.width / 2) + (obj2.width / 2);
	var hHeights = (obj1.height / 2) + (obj2.height / 2);
	
	var collisionSide = Collision.NONE;
	if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {
		var oX = hWidths - Math.abs(vX);
		var oY = hHeights - Math.abs(vY);
		if (oX >= oY) {
			if (vY > 0) {
				if(!allowOverlap(obj1,obj2))
					obj1.y += oY;
				collisionSide = Collision.TOP;
			} else {
				if(!allowOverlap(obj1,obj2))
					obj1.y -= oY;
				collisionSide = Collision.BOTTOM;
			}
		} else {
			if (vX > 0) {
				if(!allowOverlap(obj1,obj2))
					obj1.x += oX;
				collisionSide = Collision.LEFT;
			} else {
				if(!allowOverlap(obj1,obj2))
					obj1.x -= oX;
				collisionSide = Collision.RIGHT;
			}
		}
		if (Math.abs(oX - oY) < 0.1)
			collisionSide = Collision.CORNER;
	}
	if(swapped)
		collisionSide = oppositeSide(collisionSide);
	return collisionSide;
}

function handleCollisionCallbacks(obj1, obj2) {
	var collision = checkForCollision(obj1, obj2);
	if(collision) {
		//if there was a collision, call the callback functions to tell object 1 it collided with object 2 and vice versa
		if(obj1.processCollisionWith)
			obj1.processCollisionWith(obj2, collision);
		if(obj2.processCollisionWith)
			obj2.processCollisionWith(obj1, oppositeSide(collision));
		return true;
	}
	return false;
}

function renderDebugPhysics(obj) {
	if(obj) {
		context.fillStyle = "rgba(0,255,0,0.5)";
		context.fillRect(obj.x, obj.y, obj.width, obj.height);
	}
}
