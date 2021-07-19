// https://www.w3schools.com/graphics/game_sound.asp
export function sound(src, volume=1) {
  this.sound = document.createElement("audio");
	this.sound.volume = volume;
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function(){
    this.sound.play();
  }
  this.stop = function(){
    this.sound.pause();
  }
}
