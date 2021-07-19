import {
    FRICTION,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  } from "../../Constants/CONSTANTS.js";
  
  export class Road {

    constructor(
        x = 0,
        y = -3 * CANVAS_HEIGHT,
        height = CANVAS_HEIGHT * 4,
        width = CANVAS_WIDTH
      ) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.playerImage = new Image();
        this.playerImage.src = '/Minigames/BugChase/m.png'
      }

    renderRoad(ctx){
        if(this.y >= -2*CANVAS_HEIGHT){
            this.y -= CANVAS_HEIGHT;
        }
        this.y += 30;
        ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }

    renderRoadStatic(ctx){
        ctx.drawImage(this.playerImage, this.x, this.y, this.width, this.height);
    }
  
    render(ctx) {
        this.renderRoad(ctx);
    }
  }
  
