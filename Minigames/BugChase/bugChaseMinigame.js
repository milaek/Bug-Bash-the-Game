import { GAMES } from "../../Constants/CONSTANTS.js";
import { PlayerCar } from "./playerCar.js";
import { Road } from "./road.js";
import { Button } from "./button.js";
import { EnemyCarGroups } from "./enemyCarGroups.js";
import { CANVAS_WIDTH, CANVAS_HEIGHT } from "../../Constants/CONSTANTS.js";
import { Game } from "../../Core/game.js";

export class BugChaseMinigame extends Game {
  constructor(completionHandler) {
    super(completionHandler);
    this.player = new PlayerCar();
    this.road = new Road();
    this.numEnemyCars = 10;
    this.carArr = []
    this.carGroups = new EnemyCarGroups(this.numEnemyCars);
    this.pause = false;
    this.score = 0;
    this.end = false;
    this.home = new Button("HUB", CANVAS_WIDTH/2 - 300, 600, true);
    this.again = new Button("AGAIN", CANVAS_WIDTH/2 + 90, 600);
    this.startTime = new Date();
  }

  update(keys) {
    if(!this.end){
        // If the left key is pressed increase the relevant horizontal velocity
        if (keys.left) {
            this.player.addXVelocity(-10);
        }
        if (keys.right) {
            this.player.addXVelocity(10);
        }
        if (keys.up) {
            this.pause = false;
        }

        this.player.simulateMovement();
        var resetEnemy = false;
        for(let i = 0; i<this.carGroups.carArr.length; i++){
            if (this.player.isCollision(this.carGroups.carArr[i].x, this.carGroups.carArr[i].y)){
                //stop the game
                this.pause = true;
                this.player.reset();
                resetEnemy = true;
                break;
            }                    
        }
        // Doing this outside the loop because carGroups is the object to loop against
        if(resetEnemy){
            this.carGroups.reset();
        }
    }else{
        if (keys.left){
            if (this.again.selected){
                this.again.selected = false;
                this.home.selected = true;
            }
            keys.left = false;
        }

        if (keys.right){
            if(this.home.selected){
                this.home.selected = false;
                this.again.selected = true;
            }
            keys.right = false;
        }

        if (keys.enter) {
            if(this.home.selected){
                this.completionHandler(GAMES.HUB);
            }else{
                this.player.reset();
                this.carGroups.reset();
                this.end = false;
                this.startTime = new Date();
            }
            
        }
    }

  }

  render(ctx) {
    if(this.end || this.score>=30){
        localStorage.setItem(GAMES.CHASE, true);
        this.score = 0;
        this.end = true;
        this.home.render(ctx);
        this.again.render(ctx); 
        ctx.font = "120px Comic Sans MS";
        ctx.fillStyle = "orange";
        ctx.textAlign = "center";
        ctx.fillText("YOU WIN!", canvas.width/2, canvas.height/3);
    }else if(!this.pause && !this.end){
        this.road.render(ctx);
        this.carGroups.render(ctx);
        this.player.render(ctx);
        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "orange";
        ctx.textAlign = "start";
        var dateNow = new Date();
        this.score = Math.floor((dateNow.getTime() - this.startTime.getTime())/1000);
        ctx.fillText("Score: " + this.score, 24, 80);
        console.log(this.player.x, this.player.y, this.player.x_v, this.player.y_v);
    }else {
        ctx.font = "80px Comic Sans MS";
        ctx.fillStyle = "yellow";
        ctx.textAlign = "center";
        this.score = 0;
        this.startTime = new Date();
        ctx.fillText("Oh shoot! \nPress up key to start over!", canvas.width/2, canvas.height/3);
    }
  }

}
