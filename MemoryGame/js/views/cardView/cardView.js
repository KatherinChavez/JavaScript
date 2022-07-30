import { View } from "../view.js";


export class CardView extends View {
    constructor(parent, card, appManager) {
        super(parent);
        this.card = card; //model
        this.appManager = appManager;
        this.mainContainer.classList.add('cardView_mainContainer');
        this.defaultIcon = '❔'; //icono de la tarjeta
        this.mainContainer.innerHTML = this.defaultIcon;
        this.mainContainer.onclick = this.onSelected.bind(this);
        
        this.audioClick = new Audio('../Sound/click.mp3');

    }

    onSelected() {
        this.appManager.onCardViewSelected(this);
        this.audioClick.play();

    }

    show() {
        this.mainContainer.classList.add('cardView_disabled'); //agrega la clase al mainContainer
        this.mainContainer.innerHTML = this.card.icon;
    }

    hide() {
        this.mainContainer.classList.remove('cardView_disabled');
        this.mainContainer.innerHTML = this.defaultIcon;
    }

    end() {
        this.mainContainer.classList.add('cardView_disabled');
    }

    discover() {
        this.card.isDiscovered = true;
        this.mainContainer.classList.add('cardView_discovered');
    }

}