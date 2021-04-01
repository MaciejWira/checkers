import createElement from '../../functions/createElement';

const render = function(){

    const classNames = [ "chessboard__field", `chessboard__field--${this.type}` ];

    const [ actionType, capture ] = this.actionType( this.chessboard );

    if ( actionType ) classNames.push( "chessboard__field--clickable" );
    if ( 
        this.isActiveField
        || this.chessboard.lastMove.includes(this.id) 
        ) classNames.push( "chessboard__field--highlighted" );

    const figure = !this.figure ? null 
                    : createElement('div', null, { class: `chessboard__figure ${this.figure.team} ${this.figure.type}` });

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