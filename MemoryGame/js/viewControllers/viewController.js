//Clase Padre

import { View } from "../views/view.js";

export class ViewController extends View {
    constructor(appManager, parent, title = '') {
        super(parent);
        this.type = 'viewController';
        this.appManager = appManager;
        // this.parent = parent;
        this.service = null;
        this.mainContainer.classList.add('viewController_mainContainer');
        this.navigationBar = document.createElement('div');
        this.contenContainer = document.createElement('div');

        this.parent.appendChild(this.mainContainer);
        this.mainContainer.appendChild(this.navigationBar);
        this.mainContainer.appendChild(this.contenContainer);

        //this.mainContainer.className = 'mainContainer';
        this.navigationBar.className = 'navigationBar';
        this.contenContainer.className = 'contenContainer';

        this.backBtn = document.createElement('button');
        this.backBtn.innerHTML = 'Back';
        this.navigationBar.appendChild(this.backBtn);

        this.titleLbl = document.createElement('p');
        this.titleLbl.innerHTML = title;
        this.titleLbl.className = 'viewController_titleLbl';
        this.navigationBar.appendChild(this.titleLbl);

        this.backBtn.onclick = this.remove.bind(this);

    }
    show() { }
    hide() { }

    remove() {
        this.appManager.removeViewController(this);
    }
}