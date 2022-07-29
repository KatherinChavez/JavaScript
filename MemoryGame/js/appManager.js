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
        this.timeLimit = 90; //tiempo del juego
        this.showingTimer = null; // muestra las tarjetas y luego las oculta

        // if (this.username === null) {
        this.showMenu();
        // } else {
        //this.showGame();
        //     //this.showScore();
        // }

        this.cardView1 = null;
        this.cardView2 = null;
    }

    showMenu() {
        this.menuViewControler = new MenuViewController(this, this.appContainer);
    }
    showScore() {
        this.scoresViewController = new ScoresViewController(this, this.appContainer);
    }

    showGame() {
        this.gameViewControler = new GameViewController(this, this.appContainer);
        this.timer = window.setInterval(this.updateTime.bind(this), 1000);
    }

    removeViewController(viewController) {
        this.reset(false);
        this.appContainer.removeChild(viewController.mainContainer);

        console.log(viewController.type);
        switch (viewController.type) {
            case 'gameViewController':
                this.gameViewControler = null;
                break;
            case 'scoresViewController':
                this.scoresViewController = null;
                break;
            default:
                break;
        }
    }

    removeGame() {
    }

    setUsername(username) {
        this.username = username;
        window.localStorage.setItem('username', username);
    }

    onCardViewSelected(cardView) {
        if (this.cardView1 !== null && this.cardView2 !== null) return;

        this.clicks += 1;
        this.gameViewControler.updateClicks();

        if (this.cardView1 === null) {
            this.cardView1 = cardView;
            this.cardView1.show();
        } else if (this.cardView2 === null) {
            this.cardView2 = cardView;
            this.cardView2.show();
            this.showingTimer = window.setTimeout(this.resetSelectedCardViews.bind(this), 1000);
        }
    }

    resetSelectedCardViews() {
        window.clearTimeout(this.showingTimer);
        this.showingTimer = null;

        if (this.cardView1.card.id === this.cardView2.card.id) { //ambas tarjetas son iguales?
            this.cardView1.discover();  //las muestra 
            this.cardView2.discover();
            this.cardView1 = null;
            this.cardView2 = null;

            if (this.gameViewControler.isGameCompleted()) {
                console.log('game completed');// muestra ventana 
                swal("Game Completed!", "", "success");
                this.cleanGameTimer();
                this.gameViewControler.sendScore({ "username": this.username, "clicks": this.clicks, "time": this.time, "score": (this.clicks + this.time) });
            }
        } else {
            this.cardView1.hide(); //las oculta.
            this.cardView2.hide();
            this.cardView1 = null;
            this.cardView2 = null;
        }
    }

   

    updateTime() {
        if (this.time < this.timeLimit) {
            this.time += 1;
            this.gameViewControler.updateTime();
        } else {
            window.clearInterval(this.timer);
            this.gameViewControler.end();
        }
    }

    cleanGameTimer() {
        window.clearInterval(this.timer);
        this.timer = null;
    }

    reset(isCreatingTimer = true) {
        this.clicks = 0;
        this.time = 0;
        this.cleanGameTimer();
        if (isCreatingTimer) {
            this.timer = window.setInterval(this.updateTime.bind(this), 1000);
        }

        if (this.gameViewControler != null) {
            this.gameViewControler.updateTime();
            this.gameViewControler.updateClicks();
        }
    }
}