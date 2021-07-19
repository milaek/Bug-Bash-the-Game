export class ScoreBoard {
    constructor(winnum) {
        this.score = 0;
        this.winnum = winnum
    }

    render(ctx) {
        var text = this.score.toString() + "/" + this.winnum.toString() + " Bugs Bashed!"
        ctx.font = "24pt Comic Sans Ms";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#000000";
        ctx.fillText(
          text,
          1750,
          40
        );
  }
}