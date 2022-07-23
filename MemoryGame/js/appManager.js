import { GameViewController } from "./viewControllers/game/gameViewController.js";
import { MenuViewController } from "./viewControllers/menu/menuViewController.js";
import { ScoresViewController } from "./viewControllers/scores/scoresViewController.js";

export class AppManager {
    constructor() {
        this.appContainer = document.getElementById('appcontainer');
        this.menuViewControler = null;
        this.scoresViewController = null;
        this.gameViewControler = null;
 
        this.username = window.localStorage.getItem('username');
        this.clicks = 0;
        this.time = 0;
        this.timer = null;
        this.timeLimit = 15;

        if (this.username === null) {
            this.menuViewControler = new MenuViewController(this, this.appContainer);
        } else {
            this.showGame();
        }
    }

    showScore() {
        this.scoresViewController = new ScoresViewController(this, this.appContainer);
    }

    showGame() {
        this.gameViewControler = new GameViewController(this, this.appContainer);
        this.timer = window.setInterval(this.updateTime.bind(this), 1000);
    }

    removeViewController(viewController) {
        this.appContainer.removeChild(viewController.mainContainer);
    }

    removeGame() {
    }

    setUsername(username) {
        this.username = username;
        window.localStorage.setItem('username', username);
    }

    updateClicks() {
        this.clicks += 1;
        this.gameViewControler.updateClicks();
    }

    updateTime() {
        if(this.time < this.timeLimit){ 
        this.time +=1;
        this.gameViewControler.updateTime();
   } else{
    window.clearInterval(this.timer);
    this.gameViewControler.end();
   }
}

reset(){
    this.clicks = 0;
    this.time = 0;
    window.clearInterval(this.timer);
    this.timer = window.setInterval(this.updateTime.bind(this), 1000);
    this.gameViewControler.updateTime();
    this.gameViewControler.updateClicks();
}
}