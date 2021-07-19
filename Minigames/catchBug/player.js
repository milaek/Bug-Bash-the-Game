import {
  FRICTION,
  GRAVITY,
  DEV_MODE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../../Constants/CONSTANTS.js";
import { Player } from "/Minigames/Hub/player.js";

export class CatchPlayer extends Player {
  // ensure that the user can only perform one action per "frame"
  hasPerformedAction = false;
  inAir = false;

  constructor() {
		super(200, 200, 0, 0, false, 68, 60)
  }

  respawn() {
    this.y = this.spawnY;
    this.x = this.spawnX;
    this.x_v = 0;
    this.y_v = 0;
    this.inAir = false;

    // Other actions to happen when respawning
  }

  handleColisions(platform) {
      // Check if we are on a platform
      if (
        this.x < platform.x + platform.width &&
        this.x > platform.x &&
        this.y < platform.y + this.height &&
        this.y > platform.y - 5
      ) {
        if (!this.jump) {
          this.y_v = 0;
          this.y = platform.y;
          this.inAir = false;
        }
    }
  }

  isCollision(x1, y1){
    var x2 = x1 + this.width;
    var y2 = y1 + this.height;
    return this.isCornerInside(x1, y1) || this.isCornerInside(x2, y2) || 
    this.isCornerInside(x2, y1) || this.isCornerInside(x1, y2);
  }

  isCornerInside(x, y){
      return x>=this.x && x<=this.x+this.width && y>=this.y + 20 && y<=this.y+this.height - 20;
  }

  handleOutOfBounds() {
    if (this.y > CANVAS_HEIGHT || this.x < 0 || this.x > CANVAS_WIDTH) {
      this.respawn();
    }
  }

  simulateMovement(platforms) {
    // If the player is not jumping apply the effect of frictiom
    this.x_v *= FRICTION;
    if (Math.abs(this.x_v) < 0.001) {
      this.x_v = 0;
    }
    this.y_v += GRAVITY;
    this.handleColisions(platforms);
    this.handleOutOfBounds();

    this.x += this.x_v;
    this.y += this.y_v;

    this.hasPerformedAction = false;
    this.jump = false;
  }

}
