import { Game } from "../../Core/game.js";
import { GAMES } from "../../Constants/CONSTANTS.js";

document.addEventListener("DOMContentLoaded", function () {
    const newgame = new Memory();
    newgame.render();
  });

export class Memory extends Game {
    constructor(completionHandler) {
        super(completionHandler);
        this.flippedCards = [];
        this.matchedCards = 0;
        this.numMoves = 0;
        this.cards = document.getElementsByName("card");
        this.bugNames = ["African Black Beetle", "Ant", "Carabidae", "Colorado Beetle", "Fly", "Honey Bee", "Ladybug", "Spider"]
    }

    render(ctx) {
        this.shuffleCards();
        this.startMenu();
    }

    startMenu() {
        var startButton = document.getElementById("play");
        var startMenu = document.getElementById("startMenu");
        var quit = document.getElementById("quit2");
        quit.addEventListener("click", () => {window.location.href = "/index.html";});
        startButton.addEventListener("click", () => { 
            startMenu.classList.toggle("notShown");
            this.flipAllCards(); 
            setTimeout(() => {
                this.flipAllCards(); 
                this.addClickFunctionality();
                this.startTimer();
            }, 3000);
        });
    }

    flipAllCards() {
        this.cards = document.getElementsByName("card");
        console.log(this.cards);
        for (let i = 0; i < this.cards.length; i++) {
            var card = this.cards[i];
            this.flipCard(card);
        }
    }

    shuffleCards() {
        console.log("shuffle");
        const array = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
        var currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }

        //this.cards = document.getElementsByName("card");
        for (let i = 0; i < array.length; i++) {
            this.cards[i].classList.add("pair" + array[i]);
        }
    }

    addClickFunctionality() {
        console.log("add click");
        for(let i = 0; i < this.cards.length; i++) {
            const card = this.cards[i];
            card.addEventListener("click", this.wrapper);
        }
    }

    wrapper = (e) => {
        console.log("wrapper");
        this.flipCard(e.target);
        this.checkPair();
    };

    flipCard(card) {
        console.log("flip");
        if(card.classList.contains("hiddenCard")) {
            for (let i = 1; i < 9; i++) {
                if (card.classList.contains("pair" + i)) {
                    card.src = "./cards/bugs/pair" + i + ".png";
                }
            }
            card.classList.remove("hiddenCard");
            card.classList.add("flippedCard");
            this.flippedCards.push(card);
        } else {
            card.src = "./cards/hidden_card.jpg";
            card.classList.remove("flippedCard");
            card.classList.add("hiddenCard");
            this.flippedCards.pop(card);
        }
    }

    checkPair() {
        console.log("check pair");
        const numFlipped = this.flippedCards.length;
        if (numFlipped == 2) {
            this.numMoves++;
            this.updateMoves();
            let firstCard = this.flippedCards[0];
            let secCard = this.flippedCards[1];
            firstCard.removeEventListener("click", this.wrapper);
            secCard.removeEventListener("click", this.wrapper);
            if (firstCard.className == secCard.className) {
                firstCard.name = "matched";
                secCard.name = "matched";
                this.cards = document.getElementsByName("card");
                this.matchedCards += 2;
                this.showMatch(firstCard);
            } else {
                this.removeClickFunctionality();
                setTimeout(() => {
                    this.flipCard(firstCard);
                    this.flipCard(secCard);
                    this.addClickFunctionality();
                }, 1000);
            }
            this.flippedCards.pop(firstCard);
            this.flippedCards.pop(secCard);
        }
    }

    updateMoves() {
        var numMoves = document.getElementById("numMoves");
        numMoves.innerHTML = this.numMoves;
    }

    startTimer() {
        var second = 0, minute = 0;
        var timer = document.getElementById("timer");
        this.interval = setInterval(function(){
            timer.innerHTML = minute+"mins " + second+"secs";
            second++;
            if(second == 60){
                minute += 1;
                second = 0;
            }
        },1000);
    }

    isGameOver() {
        console.log("is game over " + this.matchedCards);
        if(this.matchedCards == 16) {
            clearInterval(this.interval);
            localStorage.setItem(GAMES.MEMORY, true);
            console.log(localStorage.getItem(GAMES.MEMORY));
            var restartMenu = document.getElementById("restartMenu");
            restartMenu.classList.toggle("notShown");
            var replay = document.getElementById("replay");
            replay.addEventListener("click", () => {location.reload();});
            var quit = document.getElementById("quit1");
            quit.addEventListener("click", () => {window.location.href = "/index.html";});
            return true;
        }
        return false;
    }

    removeClickFunctionality() {
        for (let i = 0; i < this.cards.length; i++) {
            let card = this.cards[i];
            card.removeEventListener("click", this.wrapper);
        }
    }

    showMatch(card) {
        const overlay = document.getElementById("success");
        setTimeout(() => { overlay.classList.toggle("notShown"); }, 600);
        this.removeClickFunctionality();
        setTimeout(() => { 
            overlay.classList.toggle("notShown");
            var isGameOver = this.isGameOver();
            if (!isGameOver) {
                this.addClickFunctionality();
            }
        }, 1500);
        const overlayImage = document.getElementById("successImage");
        const message = document.getElementById("bugname");
        for (let i = 1; i < 9; i++) {
            if (card.classList.contains("pair" + i)) {
                overlayImage.src = "./cards/bugs/pair" + i + ".png";
                message.innerHTML = this.bugNames[i - 1] + "!";
            }
        }
    }

    update = (keys) => {};
}