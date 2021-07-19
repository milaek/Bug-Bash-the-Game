import { Game } from "../../Core/game.js";
import { GAMES, GAME_COMPLETE } from "../../Constants/CONSTANTS.js";
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  DEV_MODE,
  GAME_COMPLETE_KEY,
  GAME_NOT_COMPLETE,
} from "../../Constants/CONSTANTS.js";
import { Button } from "./button.js";

export class HomeScreen extends Game {
  constructor(completionHandler) {
    super(completionHandler);
    this.introText = new Image();
    this.introText.src = "/Minigames/Home/bugbashtext.png";
    this.selectMode = false; // starts w/ intro + "press enter to begin"
    this.buttons = {
      [GAMES.HUB]: new Button("HUB", 200, 200, true),
      [GAMES.ESCAPE]: new Button("ESCAPE", 500, 200),
      [GAMES.MEMORY]: new Button("MEMORY", 200, 400),
      [GAMES.CATCH]: new Button("CATCH", 500, 400),
      [GAMES.CHASE]: new Button("CHASE", 200, 600),
      [GAMES.FIGHT]: new Button("FIGHT", 500, 600),
    };
  }

  changeButtons = (src, dest) => {
    this.buttons[src].selected = false;
    this.buttons[dest].selected = true;
  };

  update = (keys) => {
    if (DEV_MODE) {
      if (keys.left) {
        if (this.buttons[GAMES.ESCAPE].selected) {
          this.changeButtons(GAMES.ESCAPE, GAMES.HUB);
        } else if (this.buttons[GAMES.CATCH].selected) {
          this.changeButtons(GAMES.CATCH, GAMES.MEMORY);
        } else if (this.buttons[GAMES.FIGHT].selected) {
          this.changeButtons(GAMES.FIGHT, GAMES.CHASE);
        }
        keys.left = false;
      } else if (keys.right) {
        if (this.buttons[GAMES.HUB].selected) {
          this.changeButtons(GAMES.HUB, GAMES.ESCAPE);
        } else if (this.buttons[GAMES.MEMORY].selected) {
          this.changeButtons(GAMES.MEMORY, GAMES.CATCH);
        } else if (this.buttons[GAMES.CHASE].selected) {
          this.changeButtons(GAMES.CHASE, GAMES.FIGHT);
        }
        keys.right = false;
      } else if (keys.up) {
        if (this.buttons[GAMES.CHASE].selected) {
          this.changeButtons(GAMES.CHASE, GAMES.MEMORY);
        } else if (this.buttons[GAMES.MEMORY].selected) {
          this.changeButtons(GAMES.MEMORY, GAMES.HUB);
        } else if (this.buttons[GAMES.CATCH].selected) {
          this.changeButtons(GAMES.CATCH, GAMES.ESCAPE);
        } else if (this.buttons[GAMES.FIGHT].selected) {
          this.changeButtons(GAMES.FIGHT, GAMES.CATCH);
        }
        keys.up = false;
      } else if (keys.down) {
        if (this.buttons[GAMES.MEMORY].selected) {
          this.changeButtons(GAMES.MEMORY, GAMES.CHASE);
        } else if (this.buttons[GAMES.HUB].selected) {
          this.changeButtons(GAMES.HUB, GAMES.MEMORY);
        } else if (this.buttons[GAMES.ESCAPE].selected) {
          this.changeButtons(GAMES.ESCAPE, GAMES.CATCH);
        } else if (this.buttons[GAMES.CATCH].selected) {
          this.changeButtons(GAMES.CATCH, GAMES.FIGHT);
        }
        keys.down = false;
      }
      if (keys.enter) {
        for (const key in this.buttons) {
          if (this.buttons[key].selected) {
            this.completionHandler(key);
            localStorage.clear();
            localStorage.setItem(GAME_COMPLETE_KEY, GAME_NOT_COMPLETE);
            return;
          }
        }
      }
    } else {
      if (localStorage.getItem(GAME_COMPLETE_KEY) === GAME_NOT_COMPLETE) {
        this.completionHandler(GAMES.HUB);
      }
      if (keys.enter) {
        this.completionHandler(GAMES.HUB);
        localStorage.clear();
        localStorage.setItem(GAME_COMPLETE_KEY, GAME_NOT_COMPLETE);
      }
    }
  };

  render = (ctx) => {
    if (DEV_MODE) {
      // can pick a mode
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      for (const key in this.buttons) {
        this.buttons[key].render(ctx);
      }
    } else {
      if (localStorage.getItem(GAME_COMPLETE_KEY) === GAME_NOT_COMPLETE) {
        return;
      }
      // see start screen
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.drawImage(this.introText, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
      ctx.fillStyle = "#ffffff";
      ctx.font = "32pt Comic Sans Ms";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(
        "Press ENTER to start",
        CANVAS_WIDTH / 2,
        (CANVAS_HEIGHT * 3) / 4
      );
    }
  };
}
