import { GAMES } from "../Constants/CONSTANTS.js";
import { PlatformMinigame } from "../Minigames/Hub/platformMinigame.js";

import { BugChaseMinigame } from "../Minigames/BugChase/bugChaseMinigame.js";
import { CatchBug } from "../Minigames/catchBug/index.js";
import { HomeScreen } from "../Minigames/Home/homescreen.js";
import { FighterMinigame } from "../Minigames/BugFight/fighterMinigame.js";

var currentGame = GAMES.HOME;

var HUB = new PlatformMinigame(completionHandler);
var CHASE = new BugChaseMinigame(completionHandler);
var CATCH = new CatchBug(completionHandler);
var HOME = new HomeScreen(completionHandler);
var FIGHT = new FighterMinigame(completionHandler);

function completionHandler(nextLevel) {
  currentGame = nextLevel;
}

export function runtimeLoop(ctx, keys) {
  switch (currentGame) {
    case GAMES.HOME:
      console.log("Running Home");
      HOME.update(keys);
      HOME.render(ctx);
      break;
    case GAMES.HUB:
      // console.log("Running Hub");
      HUB.update(keys);
      HUB.render(ctx);
      break;
    case GAMES.FIGHT:
      console.log("Running Fight");
      FIGHT.update(keys);
      FIGHT.render(ctx);
      break;
    case GAMES.CHASE:
      console.log("Running Chase");
      CHASE.update(keys);
      CHASE.render(ctx);
      break;
    case GAMES.CATCH:
      console.log("Running Catch");
      CATCH.update(keys);
      CATCH.render(ctx);
      break;
    case GAMES.ESCAPE:
      window.location.href = "/Minigames/escapeRoom/escape.html";
      break;
    case GAMES.MEMORY:
      window.location.href = "/Minigames/Memory/memory.html";
      break;
    case GAMES.TEST:
      console.log("Running Test");
      break;
  }
}
