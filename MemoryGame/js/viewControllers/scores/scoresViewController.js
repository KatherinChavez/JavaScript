import { ViewController } from "../viewController.js";

export class ScoresViewController extends ViewController {
    constructor(appManager, parent) {
        super(appManager, parent, 'Scores');
        this.mainContainer.classList.add('scoresViewController');

        // this.mainContainer.style.left = '200px';
        // this.contenContainer.style.background = 'red';

        // this.backBtn.onclick = this.remove.bind(this);
    }

    show() {

    }
    hide() {

    }

}