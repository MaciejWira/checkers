import styles from './TeamBoard.scss';
const { container, active, heading } = styles;
import createElement from './../../functions/createElement';

export default class TeamBoard {

    constructor(team){
        this.team = team;
        this.active = false;
    };

    render(team){

        const _active = team === this.team ? active : "";

        return createElement(
                    'div', 
                    null, 
                    { class: container },
                    createElement(
                        'h2', 
                        null, 
                        { class: [ heading, _active ].join(' ') },
                        document.createTextNode(this.team)
                        )
                );
    }

}