import { CANVAS_WIDTH, CANVAS_HEIGHT, GAMES } from "../../Constants/CONSTANTS.js";
import { CatchPlayer } from "./player.js";
import { Game } from "../../Core/game.js";
import { Platform } from "./platform.js";
import { BugGroups } from "./bugGroups.js";

export class CatchBug extends Game {
  constructor(completionHandler) {
    super(completionHandler);
    this.player = new CatchPlayer();
    this.platform = new Platform(0, 900, 2000, 2);
    this.bugGroups = new BugGroups(5);
    this.score = 0;
    // for(let i = 0; i < Math.random() * 5 + 1; i++) {
    //   this.bugs.push(new Bug(100 * i, 0, 10, 10));
    // }
  }

  update(keys) {
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
      this.player.addXVelocity(-10);
      this.player.isIdle = false;
      this.player.isRight = false;
    } else if (keys.right) {
      this.player.addXVelocity(10);
      this.player.isIdle = false;
      this.player.isRight = true;
    } else {
      this.player.isIdle = true;
    }
    for(let i = 0; i<this.bugGroups.bugArr.length; i++){
      if (!this.bugGroups.bugArr[i].visible) continue;
      if (this.player.isCollision(this.bugGroups.bugArr[i].x, this.bugGroups.bugArr[i].y)){
        this.score += 10;
        this.bugGroups.bugArr[i].visible = false;
        break;
      }
    }
    this.player.simulateMovement(this.platform);

    if (this.score >= 200) {
      localStorage.setItem(GAMES.CATCH, true);
      this.completionHandler(GAMES.HUB);
    }
  }
  
  render = (ctx) => {
    this.rendercanvas(ctx);
    this.player.render(ctx);
    this.renderplat(ctx);
    this.renderbug(ctx);
    //console.log(this.player.x, this.player.y, this.player.x_v, this.player.y_v);
    ctx.font = "80px Comic Sans MS";
    ctx.fillStyle = "orange";
    ctx.textAlign = "center";
    ctx.fillText("Score: " + this.score, 200, 100);

  }

  rendercanvas(ctx) {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  // Function to render this.platforms
  renderplat(ctx) {
    this.platform.render(ctx);
  }

  renderbug(ctx) {
    this.bugGroups.render(ctx);
  }
}
