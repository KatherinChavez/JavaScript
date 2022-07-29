import { ViewController } from "../viewController.js";
import { ScoresService } from "./scoresService.js";

export class ScoresViewController extends ViewController {
    constructor(appManager, parent) {
        super(appManager, parent, 'Scores');
        this.type = 'scoresViewControlle';
        this.service = new ScoresService(this);
        this.mainContainer.classList.add('scoresViewController');
        this.contenContainer.classList.add('scoresViewController_contentContainer'); //agrega una clase al contentContainer
        this.navigationBar.classList.add('scoresViewController_navigationBar');


        this.titleLbl.classList.add('scoresViewController_navigationBar_titleLbl');
        this.backBtn.classList.add('scoresViewController_navigationBar_backBtn');

        // this.backBtn.onclick = this.remove.bind(this);

        this.service.getScores();
    }

    start(scores) {
        var table = document.createElement('table');
        this.contenContainer.appendChild(table);

        var tr = document.createElement('tr');
        table.appendChild(tr);

        var th = document.createElement('th');
        th.innerHTML = 'Name';
        tr.appendChild(th);

        var th = document.createElement('th');
        th.innerHTML = 'Clicks';
        tr.appendChild(th);

        var th = document.createElement('th');
        th.innerHTML = 'Time';
        tr.appendChild(th);

        var th = document.createElement('th');
        th.innerHTML = 'Score';
        tr.appendChild(th);

        scores.forEach(score => {
            tr = document.createElement('tr');
            table.appendChild(tr);

            var td = document.createElement('td');
            td.innerHTML = score.username;
            td.classList.add('td_name');
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = score.clicks;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = score.time;
            tr.appendChild(td);

            td = document.createElement('td');
            td.innerHTML = score.score;
            tr.appendChild(td);

        });
    }

    show() {

    }
    hide() {

    }

}