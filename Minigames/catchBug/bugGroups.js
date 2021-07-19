import {
    FRICTION,
    CANVAS_HEIGHT,
    CANVAS_WIDTH,
  } from "../../Constants/CONSTANTS.js";
import {Bug} from "./bug.js";
  
  export class BugGroups {
    // ensure that the user can only perform one action per "frame"

    constructor(
        num = 5
      ) {
        this.numEnemybugs = num;
        this.bugArr = [];
        this.height = 50;
        this.width = 50;
        for (let i = 0; i< this.numEnemybugs; i++){
            if (this.bugArr.length === 0){
                this.bugArr.push(new Bug(this.randX, 0, this.height, this.width));
            }else{
                while (true) {
                    // new bug top left corner positoin
                    var x = this.randX();
                    var y = this.randY();

                    if(this.checkPos(x, y, this.bugArr, i)){
                      this.bugArr.push(new Bug(x=x, y=y, this.height, this.width));
                      break;
                    }
                }
            }
        }
      }

    reset(){
      for (let i = 0; i< this.numEnemybugs; i++){
        if(i==0){
          this.bugArr[i].x = this.randX();
          this.bugArr[i].y = this.randY();
        }else{
          while (true) {
            // new bug top left corner positoin
            var x = this.randX();
            var y = this.randY();
  
            if(this.checkPos(x, y, this.bugArr, i)){
              this.bugArr[i].x = x;
              this.bugArr[i].y = y;
              this.bugArr[i].visible = true;
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
    
    checkPos(x, y, bugList, j){
        for(let i = 0; i<j; i++){
            if (bugList[i].isCollision(x, y)){
              return false;
            }
        }
        return true;
    }

    renderChild(ctx){
      for(let i = 0; i<this.bugArr.length; i++){
        if(!this.bugArr[i].shouldReset()){
          this.bugArr[i].updatePos();
        }else{
          while (true) {
            // new top left corner positoin
            var x = this.randX();
            var y = this.randY();

            if(this.checkPos(x, y, this.bugArr, this.bugArr.length)){
              this.bugArr[i].x = x;
              this.bugArr[i].y = y;
              this.bugArr[i].visible = true;
              break;
            }
          }
        }
        this,this.bugArr[i].render(ctx);
      }
    }

  
    render(ctx) {
      this.renderChild(ctx);
    }
  }
  
