import {
  FRICTION,
  GRAVITY,
  DEV_MODE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEFAULT_COLLISION_MARGIN,
} from "../../Constants/CONSTANTS.js";
import { sound } from "../../Core/sound.js";

export class Player {
  // ensure that the user can only perform one action per "frame"
  hasPerformedAction = false;
  inAir = false;

  constructor(
    x = 200,
    y = 200,
    x_v = 0,
    y_v = 0,
    jump = true,
    height = 34, // 2x sprite size
    width = 30
  ) {
    this.x = x;
    this.y = y;
    this.x_v = x_v;
    this.y_v = y_v;
    this.jump = jump;
    this.height = height;
    this.width = width;
    this.spawnX = x;
    this.spawnY = y;
		this.isIdle = true; // not actively moving left/right
		this.isRight = true; // initially faces right

		// dino sprite is 15x17 pixels
		this.sprite = new Image(); // faces right
		this.spriteLeft = new Image(); // faces left
		this.randomizeColor();
		this.spriteWidth = 15;
		this.spriteHeight = 17;
		this.dx = 9; // horizontal gap between frames
		this.currFrame = 0;
		this.Sy = 4; // gap between top of image and dino sprite
		this.idleFrames = 3;
		this.idleSx = 4; // horizontal gap between left of image and first idle frame
		this.walkFrames = 7;
		this.walkSx = 76; // horizontal gap between left of image and first walk frame
		this.framesPerTick = 4; // slow down animation

		// jump sounds https://jalastram.itch.io/8-bit-jump-sound-effects
		this.jumpSound = new sound("/Minigames/Hub/SFX_Jump_22.wav"); // normal jump
		this.bounceSound = new sound("/Minigames/Hub/SFX_Jump_42.wav"); // bounce on mantis
		this.stepSound = new sound("/Minigames/Hub/step.m4a", 0.2); // walking sound
  }

	// randomizes the sprite color
	randomizeColor() {
		// sprite courtesy of https://arks.itch.io/dino-characters (https://twitter.com/ScissorMarks) !

		this.sprite.onload = () => {
			this.sheetWidth = this.sprite.width; // need width for calculating left facing sprites
		}

		const rand = Math.floor(Math.random()*4);
		switch (rand) {
			case 0:
				this.sprite.src = '/Minigames/Hub/DinoSprites - doux.png';
				this.spriteLeft.src = '/Minigames/Hub/DinoSprites - doux left.png';
				break;
			case 1:
				this.sprite.src = '/Minigames/Hub/DinoSprites - mort.png';
				this.spriteLeft.src = '/Minigames/Hub/DinoSprites - mort left.png';
				break;
			case 2:
				this.sprite.src = '/Minigames/Hub/DinoSprites - tard.png';
				this.spriteLeft.src = '/Minigames/Hub/DinoSprites - tard left.png';
				break;
			case 3:
				this.sprite.src = '/Minigames/Hub/DinoSprites - vita.png';
				this.spriteLeft.src = '/Minigames/Hub/DinoSprites - vita left.png';
				break;
		}
	}

  respawn(enemies) {
    this.y = this.spawnY;
    this.x = this.spawnX;
    this.x_v = 0;
    this.y_v = 0;
    this.jump = true;
    this.inAir = false;
		this.isIdle = true;
		this.isRight = true;
		this.randomizeColor();

    // Other actions to happen when respawning
		for (const enemy of enemies) {
			enemy.alive = true; // also respawn enemies
		}
  }

  performJump() {
    if (this.addYVelocity(-12)) {
			this.jumpSound.play();
      this.jump = true;
      this.inAir = true;
    }
  }

  addXVelocity(velocity) {
    if (!this.hasPerformedAction) {
      this.x_v += velocity;
			if (this.y_v == 0) { // not in air
				this.stepSound.play();
			}
      this.hasPerformedAction = true;
    }
  }

  addYVelocity(velocity) {
    if (!this.hasPerformedAction && this.inAir === false) {
      this.y_v += velocity;
      this.hasPerformedAction = true;
      return true;
    }
    return false;
  }

  handleColisions(platforms, enemies) {
    for (const platform of platforms) {
      // Check if we are on a platform
      if (
        this.x + this.width/2 <= platform.x + platform.width &&
        this.x + this.width/2 >= platform.x &&
        this.y < platform.y + this.height &&
        this.y > platform.y - DEFAULT_COLLISION_MARGIN &&
        this.y_v >= 0
      ) {
        if (!this.jump) {
          this.y_v = 0;
          this.y = platform.y;
          this.inAir = false;
        }
      }
    }
		for (const enemy of enemies) {
      // Check if we jumped on an enemy
			if (!enemy.alive) { continue; }
      if (
        this.x + this.width/2 <= enemy.x + enemy.width &&
        this.x + this.width/2 >= enemy.x &&
        this.y < enemy.y &&
        this.y > enemy.y - enemy.height &&
        this.y_v >= 0
      ) {
				this.bounceSound.play();
        enemy.alive = false;
				this.y_v = -enemy.bounciness;
				this.inAir = true;
				this.jump = true;
				this.hasPerformedAction = true; // cannot double jump
      }
    }
  }

  handleOutOfBounds(enemies) {
    if (this.y > CANVAS_HEIGHT || this.x < 0 || this.x > CANVAS_WIDTH) {
      this.respawn(enemies);
    }
  }

  simulateMovement(platforms, enemies) {
    // If the player is not jumping apply the effect of frictiom
    this.x_v *= FRICTION;
    if (Math.abs(this.x_v) < 0.001) {
      this.x_v = 0;
    }
    this.y_v += GRAVITY;
    this.handleColisions(platforms, enemies);
    this.handleOutOfBounds(enemies);

    this.x += this.x_v;
    this.y += this.y_v;

    this.hasPerformedAction = false;
    this.jump = false;
  }

  render(ctx) {
		if (this.isIdle) { // idle, do idle animation
			this.currFrame %= this.idleFrames*this.framesPerTick;
			if (this.isRight) {
				ctx.drawImage(
					this.sprite,
					this.idleSx + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth), this.Sy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			} else {
				ctx.drawImage(
					this.spriteLeft,
					this.sheetWidth - (this.idleSx + this.spriteWidth + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth)), this.Sy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			}
		} else { // actively moving, do walking animation
			this.currFrame %= this.walkFrames*this.framesPerTick;
			if (this.isRight) {
				ctx.drawImage(
					this.sprite,
					this.walkSx + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth), this.Sy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			} else {
				ctx.drawImage(
					this.spriteLeft,
					this.sheetWidth - (this.walkSx + this.spriteWidth + Math.floor(this.currFrame/this.framesPerTick) * (this.dx + this.spriteWidth)), this.Sy,
					this.spriteWidth, this.spriteHeight,
					this.x, this.y - this.height,
					this.width, this.height
				);
			}
		}
		this.currFrame++;
    //ctx.fillStyle = "#F08080";
    //ctx.fillRect(this.x, this.y - this.height, this.width, this.height);
    if (DEV_MODE) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.x - this.width, this.y, this.width * 2, 1);
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(this.x, this.y - this.height, 1, this.height * 2);
    }
  }
}
