import {
    FRICTION,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  } from "../../Constants/CONSTANTS.js";
  
  export class PlayerCar {

    constructor(
        x = this.defaultX(),
        y = this.defaultY(),
        x_v = 0,
        y_v = 0,
        height = 340,
        width = 160
      ) {
        this.x = x;
        this.y = y;
        this.x_v = x_v;
        this.y_v = y_v;
        this.height = height;
        this.width = width;
        this.playerImage = new Image();
        this.playerImage.src = '/Minigames/BugChase/player_copy.png'
      }

    reset(){
        this.x = this.defaultX(),
        this.y = this.defaultY(),
        this.x_v = 0;
        this.y_v = 0;
    }

    defaultX(){
        return CANVAS_WIDTH/2 - 200
    }

    defaultY(){
        return CANVAS_HEIGHT*0.6
    }

    addXVelocity(velocity) {
        if (!this.hasPerformedAction) {
          this.x_v += velocity;
    
          this.hasPerformedAction = true;
        }
    }

    simulateMovement() {
        this.x_v *= FRICTION;
        if (Math.abs(this.x_v) < 0.001) {
          this.x_v = 0;
        }

        // this handles out of bounds
        var new_x = Math.max(this.x + this.x_v, 0);
        new_x = Math.min(new_x, CANVAS_WIDTH - this.width);
        this.x = new_x;
        this.hasPerformedAction = false;
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

    render(ctx) {
        ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }
  }
  
