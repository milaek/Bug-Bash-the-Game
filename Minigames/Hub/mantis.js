import {
  GRAVITY,
  DEV_MODE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_COLLISION_MARGIN,
} from "../../Constants/CONSTANTS.js";

export class Mantis {
  constructor(
    x = 200,
    y = 200,
    height = 52, // 2x sprite size
    width = 54,
		bounciness = 10, // how much the player will bounce after squishing this dude
		isRight = true
  ) {
    this.x = x;
    this.y = y;
		this.y_v = 0;
    this.height = height;
    this.width = width;
    this.spawnX = x;
    this.spawnY = y;
		this.isRight = isRight;
		this.alive = true;
		this.deathTimer = 0;
		this.bounciness = bounciness

		this.sprite = new Image(); // sprite sheet has both left and right walks
		this.sprite.src = '/Minigames/Hub/MantisMove.png';
		this.spriteWidth = 27;
		this.spriteHeight = 26;
		this.dx = 4; // horizontal gap between frames (and from edge of img)
		this.currFrame = 0;
		this.leftSy = 38; // gap between top of img to top of walking left frame
		this.rightSy = 70; // gap between top of image and walking right frame
		this.totalFrames = 2;
		this.framesPerTick = 6; // slow down animation
  }

  simulateMovement(platforms) {
		this.y_v += GRAVITY/5;
		this.y += this.y_v;
    this.handleColisions(platforms);
  }

	handleColisions(platforms) {
    for (const platform of platforms) {
      // Check if we are on a platform
      if (
        this.x + this.width/2 <= platform.x + platform.width &&
        this.x + this.width/2 >= platform.x &&
        this.y < platform.y + this.height &&
        this.y > platform.y - DEFAULT_COLLISION_MARGIN &&
        this.y_v >= 0
      ) {
        	this.y_v = 0;
        	this.y = platform.y;
      }
    }
  }

	update(platforms, player) {
			if (this.alive) {
				this.deathTimer = 0;
				this.simulateMovement(platforms);
			} else {
				this.deathTimer++;
				if (this.deathTimer > 100) { this.alive = true; } // respawn
			}
	}

  render(ctx) {
		if (this.alive) {
			this.currFrame %= this.totalFrames*this.framesPerTick;
			if (this.isRight) {
				ctx.drawImage(
					this.sprite,
					this.dx + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth), this.rightSy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			} else {
				ctx.drawImage(
					this.sprite,
					this.dx + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth), this.leftSy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			}
			this.currFrame++;
    	if (DEV_MODE) {
    	  ctx.fillStyle = "#ff0000";
    	  ctx.fillRect(this.x - this.width, this.y, this.width * 2, 1);
    	  ctx.fillStyle = "#0000ff";
    	  ctx.fillRect(this.x, this.y - this.height, 1, this.height * 2);
    	}
		}
  }
}
