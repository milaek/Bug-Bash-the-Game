import { DEFAULT_PLATFORM_COLOR } from "../../Constants/CONSTANTS.js";

export class Platform {
  constructor(x, y, width, height, color = DEFAULT_PLATFORM_COLOR) {
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.color = color;
  }

  render(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}