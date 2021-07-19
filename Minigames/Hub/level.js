import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../../Constants/CONSTANTS.js";

export class Level {
  backgroundLoaded = false;
  constructor(platforms, backgroundSrc, spawnX, spawnY, triggers, enemies) {
    this.platforms = platforms;
    this.spawnX = spawnX;
    this.spawnY = spawnY;
    this.triggers = triggers;
		this.enemies = enemies;

    // Create and Load the background image
    this.background = new Image(CANVAS_WIDTH, CANVAS_HEIGHT);
    this.background.src = backgroundSrc;
    this.background.onload = this.onBackgroundLoad();
  }

  onBackgroundLoad() {
    this.backgroundLoaded = true;
  }
}
