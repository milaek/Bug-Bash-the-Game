import { GAMES } from "../../Constants/CONSTANTS.js";

export const TriggerTypes = {
  LEVEL: "level",
  MINIGAME: "minigame",
};

export class Trigger {
  imageLoaded = false;
  imageCompleteLoaded = false;
  imageLevelLoaded = false;
  currentFrame = 0;

  constructor(x, y, type, destination) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.destination = destination;
    this.image = new Image();
    this.image.src = "/Minigames/Hub/trigger.png";
    this.image.onload = this.onImageLoad();
    this.imageComplete = new Image();
    this.imageComplete.src = "/Minigames/Hub/trigger-complete.png";
    this.imageComplete.onload = this.onImageCompleteLoad();
    this.imageLevel = new Image();
    this.imageLevel.src = "/Minigames/Hub/trigger-level.png";
    this.imageLevel.onload = this.onImageLevelLoad();
  }

  onImageLoad() {
    this.imageLoaded = true;
  }

  onImageCompleteLoad() {
    this.imageCompleteLoaded = true;
  }
  onImageLevelLoad() {
    this.imageLevelLoaded = true;
  }

  render(ctx) {
    if (this.imageLoaded) {
      if (this.type === TriggerTypes.MINIGAME) {
        const hasFinishedMinigame =
          localStorage.getItem(this.destination) ?? false;
        if (hasFinishedMinigame != false && this.imageCompleteLoaded) {
          ctx.drawImage(this.imageComplete, this.x, this.y - 50, 40, 40);
          return;
        }
      }

      var sizeOffset = 0;
      if (this.currentFrame < 20) {
        sizeOffset = -1 * this.currentFrame;
      } else {
        sizeOffset = -1 * (40 - this.currentFrame);
      }

      if (this.type === TriggerTypes.LEVEL) {
        if (this.destination === 3) {
          if (
            !(
              localStorage.getItem(GAMES.ESCAPE) &&
              localStorage.getItem(GAMES.MEMORY) &&
              localStorage.getItem(GAMES.CATCH) &&
              localStorage.getItem(GAMES.CHASE)
            )
          ) {
            return;
          }
        }

        ctx.drawImage(
          this.imageLevel,
          this.x,
          this.y - 50,
          50 - sizeOffset,
          50 - sizeOffset
        );
      } else {
        ctx.drawImage(
          this.image,
          this.x,
          this.y - 50,
          50 - sizeOffset,
          50 - sizeOffset
        );
      }

      this.currentFrame = this.currentFrame + 1;
      if (this.currentFrame > 40) {
        this.currentFrame = 0;
      }
    }
  }
}
