import createElement from "../functions/createElement";
import Chessboard from './Chessboard/Chessboard';
import { chessboardSet } from './Chessboard/chessboardSettings';
import TeamBoard from './TeamBoard/TeamBoard';

export default class Stage {

    constructor(id){
        this.container = createElement('div', null, { id });
        this.chessboard = new Chessboard( chessboardSet, this );
        document.body.appendChild( this.container );
    }

    newGame(){
        this.chessboard = new Chessboard( chessboardSet, this );
        this.render();
    }

    render(){
        if ( this.wrapper ) this.wrapper.remove();
        const teamBoardWhite = new TeamBoard('white', this.chessboard.status.team);
        const teamBoardBlack = new TeamBoard('black', this.chessboard.status.team);
        const wrapper = createElement(
                            'div', 
                            null, 
                            { class: 'stage'}, 
                            // children
                            teamBoardBlack.render(this.chessboard.status.team),
                            this.chessboard.render(),
                            teamBoardWhite.render(this.chessboard.status.team),
                        );
        this.wrapper = wrapper;
        this.container.appendChild(wrapper);
    }

}