import { Player } from "./player.js";
import { Level } from "./level.js";
import { Trigger, TriggerTypes } from "./trigger.js";
import { Platform } from "./platform.js";
import { Mantis } from "./mantis.js";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DEFAULT_COLLISION_MARGIN,
  DEV_MODE,
  GAMES,
} from "../../Constants/CONSTANTS.js";
import { Game } from "../../Core/game.js";

export class PlatformMinigame extends Game {
  currentLevel = 1;

  constructor(completionHandler) {
    super(completionHandler);
    this.levels = {
      1: new Level(
        [
          new Platform(1630, 1020, 300, 2),
          new Platform(290, 970, 1300, 2),
          new Platform(380, 834, 600, 2),
          new Platform(645, 748, 145, 2),
          new Platform(990, 890, 600, 2),
          new Platform(290, 686, 200, 2),
          new Platform(290, 566, 600, 2),
          new Platform(990, 528, 150, 2),
          new Platform(1190, 445, 150, 2),
          new Platform(1390, 368, 150, 2),
          new Platform(1390, 288, 150, 2),
          new Platform(1390, 208, 150, 2),
          new Platform(1190, 208, 150, 2),
          new Platform(550, 208, 150, 2),
          new Platform(257, 120, 115, 2),
          new Platform(406, 120, 114, 2),
          new Platform(30, 105, 113, 2),
          new Platform(1740, 64, 180, 2),
          new Platform(850, 208, 150, 2),
          new Platform(1609, 120, 125, 2),
          new Platform(30, 1065, 120, 2),
        ],
        "./Backgrounds/level1.png",
        1810,
        1000,
        [
          new Trigger(100, 80, TriggerTypes.MINIGAME, GAMES.ESCAPE),
          new Trigger(1830, 60, TriggerTypes.LEVEL, 2),
          new Trigger(30, 1055, TriggerTypes.MINIGAME, GAMES.MEMORY),
          new Trigger(400, 550, TriggerTypes.LEVEL, 3),
        ],
        [] // no enemies
      ),
      2: new Level(
        [
          new Platform(1630, 1026, 300, 2),
          new Platform(1605, 805, 27, 2),
          new Platform(1400, 757, 50, 2),
          new Platform(1350, 830, 30, 2),
          new Platform(1310, 903, 30, 2),
          new Platform(1260, 976, 40, 2),
          new Platform(820, 1046, 130, 2),
          new Platform(820, 830, 20, 2),
          new Platform(580, 903, 50, 2),
          new Platform(280, 976, 100, 2),
          new Platform(10, 1073, 200, 2),
          new Platform(435, 144, 75, 2),
          new Platform(650, 144, 123, 2),
          new Platform(905, 144, 90, 2),
          new Platform(1500, 294, 140, 2), // upgrade button
          new Platform(1433, 70, 255, 2), // search bar
          new Platform(1200, 518, 50, 2),
          new Platform(1100, 518, 50, 2),
        ],
        "./Backgrounds/level2.png",
        1810,
        1000,
        [
          new Trigger(1600, 290, TriggerTypes.MINIGAME, GAMES.CATCH), // upgrade button
          new Trigger(1650, 67, TriggerTypes.MINIGAME, GAMES.CHASE), // search by
          new Trigger(60, 70, TriggerTypes.LEVEL, 1), // dbx logo, go back to level 1
        ],
        [
          new Mantis(1650, 1000, 52, 54, 15), // bounce high!
          new Mantis(1351, 800, 26, 27, 5), // bounce low
          new Mantis(1315, 900, 26, 27, 5),
          new Mantis(1255, 950, 52, 54, 18),
          new Mantis(820, 1000, 52, 54, 15),
          new Mantis(580, 950, 52, 54, 13),
          new Mantis(270, 975, 104, 108, 29.5, false), // mega bounce
          new Mantis(50, 975, 104, 108, 35, false),
          new Mantis(1200, 500, 52, 54, 20, false),
          new Mantis(1100, 500, 52, 54, 25, false),
        ]
      ),
      3: new Level(
        [
          new Platform(1630, 1020, 300, 2),
          new Platform(520, 990, 950, 2),
          new Platform(1060, 912, 60, 2),
          new Platform(1150, 815, 365, 2),
          new Platform(1530, 740, 175, 2),
          new Platform(1630, 676, 78, 2),
          new Platform(1150, 612, 400, 2),
          new Platform(770, 750, 180, 2),
          new Platform(390, 676, 365, 2),
          new Platform(125, 620, 110, 2),
          new Platform(280, 515, 30, 2),
          new Platform(730, 474, 750, 2),
          new Platform(1570, 476, 52, 2),
          new Platform(1570, 288, 100, 2),
          new Platform(750, 285, 600, 2),
          new Platform(725, 210, 20, 2),
          new Platform(800, 150, 350, 2),
        ],
        "./Backgrounds/level3.png",
        1810,
        1000,
        [new Trigger(1100, 150, TriggerTypes.MINIGAME, GAMES.FIGHT)],
        [new Mantis(275, 510, 52, 54, 25), new Mantis(1570, 470, 52, 54, 15)]
      ),
    };
    this.player = new Player(
      this.levels[this.currentLevel].spawnX,
      this.levels[this.currentLevel].spawnY
    );
    console.log(this.levels);
  }

  checkTriggers(triggers) {
    for (const trigger of triggers) {
      if (
        this.player.x > trigger.x - DEFAULT_COLLISION_MARGIN &&
        this.player.x < trigger.x + DEFAULT_COLLISION_MARGIN &&
        this.player.y < trigger.y + DEFAULT_COLLISION_MARGIN &&
        this.player.y > trigger.y - DEFAULT_COLLISION_MARGIN
      ) {
        // The player has collided with a trigger
        if (trigger.type == TriggerTypes.LEVEL) {
          if (
            trigger.destination === 3 &&
            !(
              localStorage.getItem(GAMES.ESCAPE) &&
              localStorage.getItem(GAMES.MEMORY) &&
              localStorage.getItem(GAMES.CATCH) &&
              localStorage.getItem(GAMES.CHASE)
            )
          ) {
            return;
          }
          this.currentLevel = trigger.destination;
          this.player = new Player(
            this.levels[this.currentLevel].spawnX,
            this.levels[this.currentLevel].spawnY
          );
        }
        if (trigger.type == TriggerTypes.MINIGAME) {
          const hasFinishedMinigame =
            localStorage.getItem(trigger.destination) ?? false;

          if (hasFinishedMinigame == false) {
            console.log("MINIGAME");
            this.completionHandler(trigger.destination);
          }
        }
      }
    }
  }

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

    this.updateEnemies(this.levels[this.currentLevel].platforms, this.player);
    this.player.simulateMovement(
      this.levels[this.currentLevel].platforms,
      this.levels[this.currentLevel].enemies
    );
    this.checkTriggers(this.levels[this.currentLevel].triggers);
  }

  render(ctx) {
    this.rendercanvas(ctx);
    this.renderEnemies(ctx);
    this.renderplat(ctx);
    this.renderTriggers(ctx);
    this.player.render(ctx);
    if (DEV_MODE) {
      console.log(
        this.player.x,
        this.player.y,
        this.player.x_v,
        this.player.y_v
      );
    }
  }

  rendercanvas(ctx) {
    if (this.levels[this.currentLevel].backgroundLoaded) {
      ctx.drawImage(
        this.levels[this.currentLevel].background,
        0,
        0,
        CANVAS_WIDTH,
        CANVAS_HEIGHT
      );
    }
    // console.log(this.levels[0].background);
  }

  // Function to render this.platforms
  renderplat(ctx) {
    for (const platform of this.levels[this.currentLevel].platforms) {
      platform.render(ctx);
    }
  }

  renderTriggers(ctx) {
    for (const target of this.levels[this.currentLevel].triggers) {
      target.render(ctx);
    }
  }

  renderEnemies(ctx) {
    for (const enemy of this.levels[this.currentLevel].enemies) {
      enemy.render(ctx);
    }
  }

  updateEnemies(platforms, player) {
    for (const enemy of this.levels[this.currentLevel].enemies) {
      enemy.update(platforms, player);
    }
  }
}
