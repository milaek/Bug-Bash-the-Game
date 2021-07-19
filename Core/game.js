export class Game {
  /**
   * `Game` is the super-class for all minigames. Your minigame should extend `Game` and override all functions in this class.
   * @param {*} completionHandler This is the function your game should call when it finishes
   * It takes in a single parameter of `nextGame` which should be one of the options in the
   * `GAME` constant in `CONSTANTS.js`.
   */
  constructor(completionHandler) {
    this.completionHandler = completionHandler;
  }

  /**
   * The `render()` function should handle the drawing of the game scene.
   * @param {*} ctx The context for your game to use to draw its designs
   */
  render(ctx) {
    return;
  }

  /**
   * The update function should handle the updating of your internal game state based on
   * new input.
   * @param {*} keys A dictionary of keys that specifiy which are currently being clicked
   */
  update(keys) {
    return;
  }
}
