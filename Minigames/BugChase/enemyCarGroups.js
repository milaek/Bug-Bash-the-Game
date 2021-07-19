import {
    FRICTION,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  } from "../../Constants/CONSTANTS.js";
import {Enemy} from "./enemy.js";
  
  export class EnemyCarGroups {
    // ensure that the user can only perform one action per "frame"

    constructor(
        num = 5
      ) {
        this.numEnemyCars = num;
        this.carArr = [];
        this.height = 340;
        this.width = 160;
        for (let i = 0; i< this.numEnemyCars; i++){
            if (this.carArr.length === 0){
                this.carArr.push(new Enemy(this.randX, this.randY, this.height, this.width));
            }else{
                while (true) {
                    // new car top left corner positoin
                    var x = this.randX();
                    var y = this.randY();

                    if(this.checkPos(x, y, this.carArr, i)){
                      this.carArr.push(new Enemy(x=x, y=y, this.height, this.width));
                      break;
                    }
                }
            }
        }
      }

    reset(){
      for (let i = 0; i< this.numEnemyCars; i++){
        if(i==0){
          this.carArr[i].x = this.randX();
          this.carArr[i].y = this.randY();
        }else{
          while (true) {
            // new car top left corner positoin
            var x = this.randX();
            var y = this.randY();
  
            if(this.checkPos(x, y, this.carArr, i)){
              this.carArr[i].x = x;
              this.carArr[i].y = y;
              break;
            }
          }
        }
      }
    }
    
    randX(){
      return Math.random() * 0.9* CANVAS_WIDTH + 0.05*CANVAS_WIDTH;
    }

    randY(){
      return Math.random() * 3* CANVAS_HEIGHT + (-3 * CANVAS_HEIGHT - this.height);
    }
    
    checkPos(x, y, carList, j){
        for(let i = 0; i<j; i++){
            if (carList[i].isCollision(x, y)){
              return false;
            }
        }
        return true;
    }

    renderChild(ctx){
      for(let i = 0; i<this.carArr.length; i++){
        if(!this.carArr[i].shouldReset()){
          this.carArr[i].updatePos();
        }else{
          while (true) {
            // new top left corner positoin
            var x = this.randX();
            var y = this.randY();

            if(this.checkPos(x, y, this.carArr, this.carArr.length)){
              this.carArr[i].x = x;
              this.carArr[i].y = y;
              break;
            }
          }
        }
        this,this.carArr[i].render(ctx);
      }
    }

  
    render(ctx) {
      this.renderChild(ctx);
    }
  }
  
