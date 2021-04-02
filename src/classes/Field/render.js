import createElement from '../../functions/createElement';

const render = function(){

    const classNames = [ "field", `field--${this.type}` ];

    const [ actionType, capture ] = this.actionType( this.chessboard );

    if ( actionType ) classNames.push( "field--clickable" );

    if ( 
        this.id === this.chessboard.activeFieldId
        || this.chessboard.lastMove.includes(this.id) 
        ) classNames.push( "field--highlighted" );

    const figure = this.figure?.render();

    const handler = fieldDom => {
        fieldDom.addEventListener('click', () => {
            this.chessboard.updateStatus( 
                this.id, 
                actionType ? actionType : "",
                capture ? capture : ""
            );
            this.chessboard.stage.render();
        });
    };

    return createElement('div', handler, { class: classNames.join(" ") }, figure);
}

export default render;