export class Button {
    constructor(text, xPos, yPos, selected = false) {
      this.selected = selected;
      this.text = text;
      this.xPos = xPos;
      this.yPos = yPos;
      this.width = 200;
      this.height = 100;
      this.icon = new Image();
      this.icon.src = '/Minigames/BugChase/star.png'
    }
  
    update = (keys) => {};
  
    render = (ctx) => {
      ctx.beginPath();
      ctx.rect(this.xPos, this.yPos, this.width, this.height);
      ctx.fillStyle = "rgba(225,225,225,0.5)";
      ctx.fill();
      ctx.closePath();
      if (this.selected) {
        ctx.fillStyle = "#007ee5";
        ctx.fill();
        ctx.drawImage(this.icon, this.xPos + this.width-35, this.yPos + this.height-40, 28, 28);
        ctx.fillStyle = "white";
      }else{
        ctx.fillStyle = "#000000";
      }
    //   ctx.fillStyle = "#000000";
      ctx.font = "32pt Comic Sans Ms";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        this.text,
        this.xPos + this.width / 2,
        this.yPos + this.height / 2
      );
    };
  }
  