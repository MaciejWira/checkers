import './TeamBoard.scss';
import createElement from './../../functions/createElement';

export default class TeamBoard {

    constructor(team){
        this.team = team;
        this.active = false;
    };

    render(team){

        return createElement(
                    'div', 
                    null, 
                    { class: `teamboard${ team === this.team ? " teamboard--active" : ""}` },
                    createElement(
                        'h2', 
                        null, 
                        { class: "teamboard__heading" },
                        document.createTextNode(this.team)
                        )
                );
    }

}