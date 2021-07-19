export class Button {
  constructor(text, xPos, yPos, selected = false) {
    this.selected = selected;
    this.text = text;
    this.xPos = xPos;
    this.yPos = yPos;
    this.width = 200;
    this.height = 100;
  }

  update = (keys) => {};

  render = (ctx) => {
    ctx.beginPath();
    ctx.rect(this.xPos, this.yPos, this.width, this.height);
    if (this.selected) {
      ctx.fillStyle = "rgba(61, 154, 232, 0.5)";
    } else {
      ctx.fillStyle = "rgba(225,225,225,0.5)";
    }
    ctx.fill();
    ctx.closePath();
    ctx.font = "32pt Comic Sans Ms";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#000000";
    ctx.fillText(
      this.text,
      this.xPos + this.width / 2,
      this.yPos + this.height / 2
    );
  };
}
