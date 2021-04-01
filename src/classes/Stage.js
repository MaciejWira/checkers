import createElement from "../functions/createElement";
import Chessboard from './Chessboard/Chessboard';
import { chessboardSet } from './Chessboard/chessboardSettings';

export default class Stage {

    constructor(id){
        this.container = createElement('div', null, { id });
        this.chessboard = new Chessboard( chessboardSet, this );
        document.body.appendChild( this.container );
    }

    render(){
        if ( this.wrapper ) this.wrapper.remove();
        const wrapper = createElement('div', null, { class: 'stage'}, this.chessboard.render());
        this.wrapper = wrapper;
        this.container.appendChild(wrapper);
    }

}