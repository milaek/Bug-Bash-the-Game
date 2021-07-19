import {
  FRICTION,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DEV_MODE
} from "../../Constants/CONSTANTS.js";

export class Bug {
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
      this.visible = true;
      this.image = new Image();
      this.image.src = '/Minigames/Memory/cards/bugs/pair' + Math.floor((Math.random() * 6) + 1) +'.png';
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
      return x>=this.x-10 && x<=this.x+this.width+10 && y>=this.y-10 && y<=this.y+this.height+10;
  }

  shouldReset(){
      return this.y >= CANVAS_HEIGHT;
  }

  updatePos(){
      this.y = this.y+10;
  }

  render(ctx) {
    if (!this.visible) return;
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    if (DEV_MODE) {
      ctx.fillStyle = "#ff0000";
      ctx.fillRect(this.x - this.width, this.y, this.width * 2, 1);
      ctx.fillStyle = "#0000ff";
      ctx.fillRect(this.x, this.y - this.height, 1, this.height * 2);
    }
  }
}

