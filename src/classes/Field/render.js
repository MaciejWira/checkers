import createElement from '../../functions/createElement';
import styles from './field.scss';
const { container, highlighted, clickable } = styles;

const render = function(){

    const classNames = [ container, styles[this.type] ];

    const [ actionType, capture ] = this.actionType( this.chessboard );

    if ( actionType ) classNames.push( clickable );

    if ( 
        this.id === this.chessboard.activeFieldId
        || this.chessboard.lastMove.includes(this.id) 
        ) classNames.push( highlighted );

    const figure = this.figure?.render();

    const handler = fieldDom => {
        fieldDom.addEventListener('click', () => {
            this.chessboard.updateStatus( 
                this.id, 
                actionType ? actionType : "",
                capture ? capture : ""
            );
        });
    };

    return createElement('div', actionType ? handler : null, { class: classNames.join(" ") }, figure);
}

export default render;