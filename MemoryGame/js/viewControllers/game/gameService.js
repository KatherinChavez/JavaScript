import { Card } from "../../models/card.js";

export class GameService {
    constructor(viewController) {
        this.viewController = viewController;
    }

    getCards() {
        var request = new XMLHttpRequest();
        request.open('GET', 'https://us-central1-beehivebackend-23257.cloudfunctions.net/app/cards/8'); 
        request.onreadystatechange = this.getCardsCompleted.bind(this);
        request.send();
    }

    getCardsCompleted(event){
        var cards = [];
        var request = event.target;
        if(request.readyState === 4){
            if(request.status === 200){
                var cardsData = JSON.parse(request.response);
                cardsData.cards.forEach(cardData => {
                    var card = new Card(cardData.id, cardData.icon); 
                    cards.push(card);
                });
                this.viewController.start(cards);
            }
        }
    }
}