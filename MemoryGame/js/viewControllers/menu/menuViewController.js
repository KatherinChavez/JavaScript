import { ViewController } from "../viewController.js";

export class MenuViewController extends ViewController {
    constructor(appManager, parent) {
        super(appManager, parent, 'Menu');
        this.type = 'menuViewController';
        this.mainContainer.classList.add('menuViewControler');
        this.navigationBar.classList.add('menuViewController_navigationBar');
        
        this.backBtn.hidden = true;

        var text1Lbl = document.createElement('p');
        var text2Lbl = document.createElement('p');
        this.usernameIn = document.createElement('input');
        this.playBtn = document.createElement('button');
        this.scoreBtn = document.createElement('button');

        this.contenContainer.appendChild(text1Lbl);
        this.contenContainer.appendChild(text2Lbl);
        this.contenContainer.appendChild(this.usernameIn);
        this.contenContainer.appendChild(this.playBtn);
        this.contenContainer.appendChild(this.scoreBtn);

        text1Lbl.innerHTML = 'Card Memory Game';
        text2Lbl.innerHTML = 'Enter Username to play';
        this.usernameIn.placeholder = 'Username';
        this.playBtn.innerHTML = 'PLAY';
        this.scoreBtn.innerHTML = 'SCORES';

        this.contenContainer.classList.add('menuViewController_contenContainer');
        text1Lbl.className = 'menuViewController_text1Lbl';
        text2Lbl.className = 'menuViewController_text2Lbl';
        this.usernameIn.classList.add('menuViewController_usernameIn');
        this.playBtn.classList.add('menuViewController_buttons');
        this.scoreBtn.classList.add('menuViewController_buttons');

        this.playBtn.onclick = this.onPlayBtn.bind(this);
        this.scoreBtn.onclick = this.onScoreBtn.bind(this);
    }

    onPlayBtn() {
        var username = this.usernameIn.value;
        if (username !== '') {
            this.appManager.setUsername(username);
            this.appManager.showGame();
        }
    }

    onScoreBtn() {
        this.appManager.showScore();
    }
}