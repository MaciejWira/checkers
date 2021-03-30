import './TeamBoard.scss';

export default class TeamBoard {

    constructor(team){
        this.team = team;
        this.active = false;
    };

    render(team){

        return `
            <div class="teamboard${ team === this.team ? " teamboard--active" : "" }">
                <h2 class="teamboard__heading">${this.team}</h2>
            </div>
        `;
    }

}