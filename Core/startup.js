import { runtimeLoop } from "./render.js";
import { keys, keydown, keyup } from "./keyboard.js";
import { CANVAS_HEIGHT, CANVAS_WIDTH } from "../Constants/CONSTANTS.js";

// Wait until the DOM is loaded before doing anything
document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("canvas");
  console.log(canvas);
  var ctx = canvas.getContext("2d");
  console.log(ctx);
  ctx.canvas.height = CANVAS_HEIGHT;
  ctx.canvas.width = CANVAS_WIDTH;

  // Adding the event listeners
  document.addEventListener("keydown", keydown);
  document.addEventListener("keyup", keyup);

  setInterval(runtimeLoop, 30, ctx, keys);
});

// prevent using arrow keys to scroll
window.addEventListener(
  "keydown",
  function (e) {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  },
  false
);
