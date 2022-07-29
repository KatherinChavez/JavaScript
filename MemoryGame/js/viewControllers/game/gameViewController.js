import { CardView } from "../../views/cardView/cardView.js";
import { ViewController } from "../viewController.js";
import { GameService } from "./gameService.js";

export class GameViewController extends ViewController {
    constructor(appManager, parent) {
        super(appManager, parent, 'Game');
        this.type = 'gameViewController';
        this.mainContainer.classList.add('gameViewController');
        this.service = new GameService(this);
        this.cardViews = [];

        var hudContainer = document.createElement('div');
        hudContainer.className = 'gameViewController_hudContainer';
        this.contenContainer.appendChild(hudContainer);
        this.contenContainer.classList.add('gameViewController_contenContainer');
        this.navigationBar.classList.add('gameViewController_navigationBar');

        this.titleLbl.classList.add('gameViewController_navigationBar_titleLbl');
        this.backBtn.classList.add('gameViewController_navigationBar_backBtn');

        this.cardsContainer = document.createElement('div');
        this.cardsContainer.className = 'gameViewController_cardsContainer';
        this.contenContainer.appendChild(this.cardsContainer);

        this.clicksLbl = document.createElement('p');
        hudContainer.appendChild(this.clicksLbl);
        this.updateClicks();
        this.clicksLbl.className = 'gameViewController_clicksLbl';

        this.timeLbl = document.createElement('p');
        hudContainer.appendChild(this.timeLbl);
        this.updateTime();
        this.timeLbl.className = 'gameViewController_timeLbl';

        this.resetBtn = document.createElement('button');
        hudContainer.appendChild(this.resetBtn);
        this.resetBtn.innerHTML = 'Reset';
        this.resetBtn.className = 'gameViewController_resetBtn';
        this.resetBtn.onclick = this.reset.bind(this);

        this.service.getCards();
    }

    start(cards) {
        this.cardsContainer.innerHTML = ''; //limpia
        this.cardViews = []; //vuelve a mostar arreglo
        cards.forEach(card => {
            var cardView = new CardView(this.cardsContainer, card, this.appManager);
            this.cardViews.push(cardView);
        });
    }

    end() {
        this.cardViews.forEach(cardView => {
            cardView.end();
        });
    }

    isGameCompleted() {
        for (let index = 0; index < this.cardViews.length; index++) {
            const card = this.cardViews[index].card;
            if (!card.isDiscovered) {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.appManager.reset(true);
        this.service.getCards(); //obtiene tarjetas
    }

    show() { }

    hide() { }

    updateClicks() {
        this.clicksLbl.innerHTML = `<b>Clicks:</b> ${this.appManager.clicks}`;
    }

    updateTime() {
        this.timeLbl.innerHTML = `<b>Time:</b> ${this.appManager.time}`;
    }

    sendScore(score) {
        this.service.sendScore(score);
    }

}