import { FighterPlayer } from "/Minigames/BugFight/player.js";
import { Platform } from "/Minigames/Hub/platform.js";
import { Enemy } from "/Minigames/BugFight/enemy.js";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  GAMES,
  GAME_COMPLETE,
  GAME_COMPLETE_KEY,
} from "/Constants/CONSTANTS.js";
import { Game } from "../../Core/game.js";
import { ScoreBoard } from "/Minigames/BugFight/score.js";

export class FighterMinigame extends Game {
  backgroundLoaded = false;
  constructor(completionHandler) {
    super(completionHandler);
    this.player = new FighterPlayer();
    this.platforms = [];
    this.createplat(this.platforms);
    this.enemies = [];
    this.createenemies(this.enemies, this.platforms);
    this.createfloors(this.platforms);
    this.scoreboard = new ScoreBoard(this.enemies.length);
    this.background = new Image(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.background.src = "Minigames/BugFight/dropbox_logo.png";
    this.background.onload = this.onBackgroundLoad();
  }

  createplat = (platforms) => {
    var num = 4;
    /*    for (let i = 1; i < num; i++) {
      platforms.push(new Platform(100 * i, 200 + 200 * i, 500, 10));
    }*/
    // top 2 points
    platforms.push(new Platform(455, 115, 400, 2, "#AEDCF7"));
    platforms.push(new Platform(1070, 115, 400, 2, "#AEDCF7"));
    // middle 2 points
    platforms.push(new Platform(455, 420, 400, 2, "#AEDCF7"));
    platforms.push(new Platform(1070, 420, 400, 2, "#AEDCF7"));
    // bottom 2 points
    platforms.push(new Platform(500, 722, 250, 2, "#AEDCF7"));
    platforms.push(new Platform(1170, 722, 250, 2, "#AEDCF7"));
    // outer top 2 points
    platforms.push(new Platform(100, 270, 250, 2, "#AEDCF7"));
    platforms.push(new Platform(1570, 270, 250, 2, "#AEDCF7"));
    // inner top point
    platforms.push(new Platform(860, 270, 200, 2, "#AEDCF7"));
    // outer middle 2 points
    platforms.push(new Platform(100, 570, 250, 2, "#AEDCF7"));
    platforms.push(new Platform(1570, 570, 250, 2, "#AEDCF7"));
    // inner middle point
    platforms.push(new Platform(860, 570, 200, 2, "#AEDCF7"));
    // bottom 1 point
    platforms.push(new Platform(760, 920, 400, 2, "#AEDCF7"))
  };

  createfloors = (platforms) => {
    platforms.push(
      new Platform(100, CANVAS_HEIGHT - 50, CANVAS_WIDTH - 200, 50, "#0060fa")
    );
    platforms.push(new Platform(CANVAS_WIDTH/2 - 65, CANVAS_HEIGHT- 300, 150, 2));
    platforms.push(new Platform(580, 515, 150, 2));
    platforms.push(new Platform(580, 625, 150, 2));
    platforms.push(new Platform(580, 220, 150, 2));
    platforms.push(new Platform(580, 325, 150, 2));
    platforms.push(new Platform(1195, 515, 150, 2));
    platforms.push(new Platform(1195, 625, 150, 2));
    platforms.push(new Platform(1195, 220, 150, 2));
    platforms.push(new Platform(1195, 325, 150, 2));



  };

  createenemies = (enemies, platforms) => {
    platforms.forEach((platform) => {
      var height = 52;
      var width = 54;
      var l_boundary = platform.x;
      var r_boundary = l_boundary + platform.width;
      var y = platform.y - height;
      var x = Math.floor(
        Math.random() * (Math.floor(r_boundary) - Math.ceil(l_boundary) + 1) +
          Math.ceil(l_boundary)
      );
      var speed = Math.floor(
        Math.random() * (Math.floor(5) - Math.ceil(1) + 1) + Math.ceil(1)
      );
      enemies.push(
        new Enemy(x, y, 0, 0, height, width, l_boundary, r_boundary, speed)
      );
    });
  };

  update(keys) {
    if (keys.up) {
      this.player.performJump();
    }
    // If the left key is pressed increase the relevant horizontal velocity
    if (keys.left) {
      this.player.addXVelocity(-2.5);
      this.player.isIdle = false;
      this.player.isRight = false;
    } else if (keys.right) {
      this.player.addXVelocity(2.5);
      this.player.isIdle = false;
      this.player.isRight = true;
    } else {
      this.player.isIdle = true;
    }
    // Handle player's turn and score keeping
    this.player.simulateMovement(this.platforms, this.enemies, this.scoreboard);

    // Handle enemies' turns
    this.enemiesTurns();

    // Handle win state
    if (this.scoreboard.score === this.enemies.length) {
      this.completionHandler(GAMES.HUB);
      localStorage.setItem(GAMES.FIGHT, true);
      localStorage.setItem(GAME_COMPLETE_KEY, GAME_COMPLETE);
    }
  }

  enemiesTurns() {
    this.enemies.forEach((enemy) => {
      // Handle enemy processes
      this.enemyStep(enemy);
    });
  }

  enemyStep(enemy) {
    if (!enemy.isRemove) {
      enemy.simulateMovement();
    }
  }

  render(ctx) {
    this.rendercanvas(ctx);
    this.player.render(ctx);
    this.renderplat(ctx);
    this.renderenemies(ctx);
    this.scoreboard.render(ctx);
    console.log(this.player.x, this.player.y, this.player.x_v, this.player.y_v);
  }

  onBackgroundLoad() {
    this.backgroundLoaded = true;
  }

  rendercanvas(ctx) {
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    if (this.backgroundLoaded) {
      ctx.drawImage(
        this.background,
        350,
        50,
        CANVAS_WIDTH - 700,
        CANVAS_HEIGHT - 200
      );
    }
  }

  // Function to render this.platforms
  renderplat(ctx) {
    for (const platform of this.platforms) {
      platform.render(ctx);
    }
  }

  // Function to render this.enemies
  renderenemies(ctx) {
    this.enemies.forEach((enemy) => {
      enemy.render(ctx);
    });
  }
}
