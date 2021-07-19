import {
  FRICTION,
  GRAVITY,
  DEV_MODE,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
} from "../../Constants/CONSTANTS.js";

export class Enemy {
    isDie = false;
    isRemove = false;
    goLeft = true;

    constructor(
        x = 0,
        y = 0,
        x_v = 0,
        y_v = 0,
        height = 0,
        width = 0,
        l_boundary = 0,
        r_boundary = 0,
        speed = 1,
    ) {
    this.x = x;
    this.y = y;
    this.spawnX = x;
    this.spawnY = y;
    this.x_v = x_v;
    this.y_v = y_v;
    this.height = height;
    this.width = width;
    this.right = this.x + this.width;
    this.down = this.y + this.height;
    this.l_boundary = l_boundary;
    this.r_boundary = r_boundary;
    this.speed = speed;
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

    simulateMovement() {
        if (this.isDie) {
            this.y_v += GRAVITY*2;
            this.handleOutOfBounds()
        } else {
            this.nextLoopStep();
            this.x_v *= FRICTION;
            if (Math.abs(this.x_v) < 0.001) {
            this.x_v = 0;
            }
        }
        this.x += this.x_v;
        this.right = this.x + this.width;
        this.y += this.y_v;
        this.down = this.y +this.height;
    }

    nextLoopStep() {
        if (this.goLeft) {
            if (this.right >= this.r_boundary) {
                this.goLeft = false;
            } else {
                this.x_v = this.speed;
            }
        } else {
            if (this.x <= this.l_boundary) {
                this.goLeft = true;
            } else {
                this.x_v = -this.speed;
            }
        }
    }

    respawn() {
        this.isDie = false;
        this.isRemove = false;
        this.x = this.spawnX;
        this.y = this.spawnY;
        this.right = this.x + this.width;
        this.down = this.y +this.height;
        this.y_v = 0;
        this.x_v = 0
    }

    handleOutOfBounds() {
        if (this.y > CANVAS_HEIGHT || this.x > CANVAS_WIDTH) {
            this.isRemove = true;
        }
    }

    render(ctx) {
        if (!this.isDie) {
            this.currFrame %= this.totalFrames * this.framesPerTick;
            if (this.goLeft) {
                ctx.drawImage(
                    this.sprite,
                    this.dx + Math.floor(this.currFrame / this.framesPerTick) * (this.dx + this.spriteWidth), this.leftSy,
                    this.spriteWidth, this.spriteHeight,
                    this.x, this.y,
                    this.width, this.height
                );
            } else {
                ctx.drawImage(
                    this.sprite,
                    this.dx + Math.floor(this.currFrame / this.framesPerTick) * (this.dx + this.spriteWidth), this.rightSy,
                    this.spriteWidth, this.spriteHeight,
                    this.x, this.y,
                    this.width, this.height
                );
            }
            this.currFrame++;
        }

        if (DEV_MODE) {
          ctx.fillStyle = "#ff0000";
          ctx.fillRect(this.x - this.width, this.y, this.width * 2, 1);
          ctx.fillStyle = "#0000ff";
          ctx.fillRect(this.x, this.y - this.height, 1, this.height * 2);
        }

    }
}

