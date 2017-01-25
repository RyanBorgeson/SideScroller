//This file manages loading and playing of sounds

//Call this to load a sound file.
function loadSound(url) {
	console.log("Loading sound: " + url);
	
	var sound = [new Audio(url)];
	sound[0].inUse = false;
	sound[0].oncanplaythrough = function itemLoaded(event) {
		console.log("Loaded " + url);
		loadRemaining--;
		sound[0].oncanplaythrough = function(){}
	};
	sound[0].onerror = function(event) {
		console.warn("Failed to load " + url);
		sound[0].error = true;
		loadRemaining--;
	};
	return sound;
}


/*  Call this to play a loaded sound.
 * Parameter "soundAsset" = the sound object pool previously loaded
 * Parameter "volume" = number 0.00 to 1.00 of volume percentage (defaults to 1.00)
 */
function playSound(soundAsset, volume, loop) {
	if(!soundAsset) console.warn("Unknown sound!");
	//console.log("play sound: " + soundAsset[0].src);
	
	if(volume==undefined)
		volume = 1.0;
	
	var found = -1;
	for(var i=0; i<soundAsset.length; i++) {
		if(!isPlaying(soundAsset, i)) {
			found = i;
			break;
		}
	}
	
	if(found < 0) {
		soundAsset.push(new Audio(soundAsset[0].src));
		found = soundAsset.length-1;
		//console.log("created new sound instance", soundAsset.length);
	}
	
	if(loop)
		soundAsset[found].loop = true;
	else
		soundAsset[found].loop = false;
	soundAsset[found].inUse = true;
	soundAsset[found].volume = volume;
	soundAsset[found].play();
	
	return found;
}

//Stops a given sound from playing (optionally only a specific instance)
function stopSound(soundAsset, instanceNumber) {
	if(!soundAsset) console.warn("Unknown sound!");
	var start = 0;
	var end = soundAsset.length;
	if(instanceNumber!=undefined) {
		start = instanceNumber;
		end = instanceNumber+1;
	}
	for (var i = start; i < end; i++) {
		soundAsset[i].pause();
		soundAsset[i].currentTime = 0;
		soundAsset[i].inUse = false;
	}
}

//Sets the volume of a sound element to a new percentage (optionally only a specific instance)
function setVolume(soundAsset, volume, instanceNumber) {
	if(!soundAsset) console.warn("Unknown sound!");
	var start = 0;
	var end = soundAsset.length;
	if(instanceNumber!=undefined) {
		start = instanceNumber;
		end = instanceNumber+1;
	}
	for (var i = start; i < end; i++) {
		soundAsset[i].volume = volume;
	}
}

//Returns if a sound is playing
function isPlaying(soundAsset, instanceNumber) {
	if(!soundAsset) console.warn("Unknown sound!");
	var start = 0;
	var end = soundAsset.length;
	if(instanceNumber!=undefined) {
		start = instanceNumber;
		end = instanceNumber+1;
	}
	for (var i = start; i < end; i++) {
		if(!soundAsset[i].ended 
				&& soundAsset[i].inUse 
				&& !soundAsset[i].paused)
			return true;
	}
	return false;
}