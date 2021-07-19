export var keys = {
	  right: false,
	  left: false,
	  up: false,
		down: false,
		enter: false,
};

// This function will be called when a key on the keyboard is pressed
export function keydown(e) {
  // 37 is the code for the left arrow key
  if(e.keyCode == 37) {
      keys.left = true;
  }
  // 38 is the code for the up arrow key
  if(e.keyCode == 38) {
    keys.up = true;
  }
  // 39 is the code for the right arrow key
  if(e.keyCode == 39) {
      keys.right = true;
  }
	// 40 = down
	if (e.keyCode == 40) {
		keys.down = true;
	}
	// 13 = enter
	if (e.keyCode == 13) {
		keys.enter = true;
	}
}
// This function is called when the pressed key is released
export function keyup(e) {
  if(e.keyCode == 37) {
      keys.left = false;
  }
  if(e.keyCode == 38) {
    keys.up = false;

  }
  if(e.keyCode == 39) {
      keys.right = false;
  }
	if (e.keyCode == 40) {
		keys.down = false;
	}
	if (e.keyCode == 13) {
		keys.enter = false;
	}
}
