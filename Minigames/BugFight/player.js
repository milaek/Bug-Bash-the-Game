import { Player } from "/Minigames/Hub/player.js";
import {DEFAULT_COLLISION_MARGIN, CANVAS_WIDTH, CANVAS_HEIGHT} from "/Constants/CONSTANTS.js";


export class FighterPlayer extends Player {
    constructor() {
        super();
        this.x = CANVAS_WIDTH / 2 - this.width / 2;
        this.y = CANVAS_HEIGHT - 50;
        this.spawnX = this.x;
        this.spawnY = this.y;
    }

    handleColisions(platforms, enemies) {
        for (const platform of platforms) {
            // Check if we are on a platform
            if (
                this.x + this.width / 2 <= platform.x + platform.width &&
                this.x + this.width / 2 >= platform.x &&
                this.y < platform.y + this.height &&
                this.y > platform.y - DEFAULT_COLLISION_MARGIN &&
                this.y_v >= 0
            ) {
                if (!this.jump) {
                    this.y_v = 0;
                    this.y = platform.y;
                    this.inAir = false;
                }
            }
        }
    }

    handleCombatCollisions(enemies, scoreboard) {
        enemies.forEach((enemy) => {
            // Check if we have touched an enemy
            if (
                this.x <= enemy.right &&
                this.x + this.width >= enemy.x &&
                this.y <= enemy.down &&
                this.y + this.height >= enemy.y
            ) {
                // Check for bug bash
                if (!enemy.isDie) {
                    if (this.y + this.height <= enemy.y + this.y_v && this.y + this.height >= enemy.y - this.y_v) {
                        this.y_v = -10
                        enemy.isDie = true;
                        scoreboard.score += 1;
                    } else {
                        this.respawn();
                        scoreboard.score = 0;
                        enemies.forEach((enemy) => {
                            if (enemy.isDie) {
                                enemy.respawn();
                            }
                        });
                    }
                }
            }
        });
    }

    respawn() {
        this.y = this.spawnY;
        this.x = this.spawnX;
        this.x_v = 0;
        this.y_v = 0;
        this.jump = true;
        this.inAir = false;
        this.isIdle = true;
        this.isRight = true;
        this.randomizeColor();
    }

    simulateMovement(platforms, enemies, scoreboard) {
        super.simulateMovement(platforms, enemies);
        this.handleCombatCollisions(enemies, scoreboard);
    }
}