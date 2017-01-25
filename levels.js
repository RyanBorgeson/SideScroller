//This file defines the setup parameters for each level

var levelNum;
var world;
const TILESIZE=32;

//global gravity constant (pixels/second^2)
const GRAVITY = 1080;

/*
 * Handles mapping of a level character to the entity data.
 * This function must be called once per entity in order for the world to know what type of entity to spawn when a level has a certain character in it
 */
var entityMap = [];
function registerEntity(classVar, charMap) {
	if(charMap==' ') return; //a space is reserved for blank space, so don't allow that to be registered
	console.log("Registered entity: " + charMap);
	entityMap[charMap] = classVar;
}

//when a level is complete, transition to the next level, or when done with all levels, return to the title screen
function startLevel(num) {
	levelNum = num;
	if(levelNum >= gameLevels.length)
		switchGameState('Title'); //if there are no more levels, go back to the title screen
	else {
		//otherwise, populate the world with the next level's data
		world = new World(gameLevels[levelNum]);
	}
}

function World(data) {
	this.data = [];
	var level = gameLevels[levelNum];
	for(var x=0; x<level[0].length; x++) { //loop through the rows of the level's data
		for(var y=0; y<level.length; y++) { //loop through the columns of each row in the level's data
			var type = level[y][x];
			if(type != ' ') { //when the level data isn't a SPACE, spawn the appropriate entity
				var constructor = entityMap[type]; //looks up how to construct an entity of the given type
				if(constructor == undefined) //trigger an error if the type wasn't found
					console.log('Unknown entity "'+type+'" at ('+x+','+y+')');
				else {
					var entity = new constructor(x*TILESIZE, y*TILESIZE); //create the new entity at the grid position (x,y)
					this.data.push(entity); //add the new entity to the world at the specified position
				}
			}
		}
	}
	this.view = new Camera(level[0].length*TILESIZE, level.length*TILESIZE);
}

World.prototype.update = function(deltaTime) {
	for(var i=0; i<this.data.length; i++) {
		 this.data[i].update(deltaTime);
	}
	
	for(var i=this.data.length-1; i>=0; i--) {
		movePhysics(deltaTime, this.data, this.data[i]);
	}
}

World.prototype.render = function() {
	var data = this.data;
	this.view.render(function() {
		for(var i=0; i<data.length; i++)
			data[i].render();
	});
}

World.prototype.remove = function(obj) {
	this.data.splice(this.data.indexOf(obj),1);
}

var gameLevels = [
	//level 1
	['XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
	 'X  P                                                                                     X                  X',
	 'X                                                                                        X                  X',
	 'XXXXXXX                                                                                  X      X  X  X  X  X',
	 'X      X                                                                                 X      X  X  X  X  X',
	 'X       X                                                   @                            X      XXXX  X  X  X',
	 'X                                                          XXX                           X      X  X  X     X',
	 'X                                                   XX                   X               X      X  X  X  X  X',
	 'X                                                                       XXX              X                  X',
	 'X                                         XX  XX               X       XXXXX                                X',
	 'X               o                    XX                     XXXX      XXXXXXX                  ooooooo      X',
	 'X   o     X  X        o         X                         X              X      XX       X     ooooooo      X',
	 'X    oooooXXXX    o         XXX XX                      X                X            X  X     ooooooo      X',
	 'X                X  @     XXXXXXXXX            XXX     X     ^^^^^    @  X      !        X     ooooooo   @  X',
	 'XX  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'],
	 
	//level 2
	['XXXXXXXXXXXXXXXXXXXXXXX',
	 'X                     X',
	 'X         XXXX        X',
	 'X     @ XX            X',
	 'X    XX         X     X',
	 'X               X     X',
	 'XXXX            X     X',
	 'X   X           X     X',
	 'X       X       X     X',
	 'X             XXX     X',
	 'X               X     X',
	 'X          XX   X     X',
	 'X               X     X',
	 'X     XXX       X     X',
	 'X               X     X',
	 'XXX             X     X',
	 'X  X            X     X',
	 'X     XXX       X     X',
	 'X        X      X     X',
	 'X             XXX     X',
	 'X          XX   X     X',
	 'X     XXX       X     X',
	 'X               X     X',
	 'XXX             X     X',
	 'X     XX        X     X',
	 'X       X       X     X',
	 'X           P   X     X',
	 'X         XXXX  X     X',
	 'X               X^^!^^X',
	 'X               XXXXXXX']
];