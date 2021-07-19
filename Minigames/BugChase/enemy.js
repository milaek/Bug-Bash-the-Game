import {
    FRICTION,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  } from "../../Constants/CONSTANTS.js";
  
  export class Enemy {
    // ensure that the user can only perform one action per "frame"

    constructor(
        x,
        y,
        height = 300,
        width = 150
      ) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.playerImage = new Image();
        this.playerImage.src = '/Minigames/BugChase/' + Math.floor((Math.random() * 5) + 1) +'.png';
      }

    reset(x, y){
        this.x = x;
        this.y = y;
    }

    isCollision(x1, y1){
        var x2 = x1 + this.width;
        var y2 = y1 + this.height;
        return this.isCornerInside(x1, y1) || this.isCornerInside(x2, y2) || 
        this.isCornerInside(x2, y1) || this.isCornerInside(x1, y2);
    }

    isCornerInside(x, y){
        return x>=this.x-this.width-20 && x<=this.x+2*this.width+20 && y>=this.y-this.height-20 && y<=this.y+2*this.height+20;
    }

    shouldReset(){
        return this.y >= CANVAS_HEIGHT;
    }

    updatePos(){
        this.y = this.y+10;
    }
  
    render(ctx) {
        ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }
  }
  
