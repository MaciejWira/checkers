import createElement from '../../functions/createElement';

const render = function(){

    const rows = this.fields.map( row => {

        const _fields = row.map( field => {

            const classNames = [ "chessboard__field", `chessboard__field--${field.type}` ];

            const [ actionType, capture ] = field.actionType( this );

            if ( actionType ) classNames.push( "chessboard__field--clickable" );
            if ( 
                this.activeFieldId === field.id 
                || this.lastMove.includes(field.id) 
                ) classNames.push( "chessboard__field--highlighted" );

            const figure = !field.figure ? null 
                            : createElement('div', null, { class: `chessboard__figure ${field.figure.team} ${field.figure.type}` });

            const fieldHandler = fieldDom => {
                fieldDom.addEventListener('click', () => {
                    this.updateStatus( 
                        field.id, 
                        actionType ? actionType : "",
                        capture ? capture : ""
                    );
                    this.stage.render();
                });
            };

            return createElement('div', fieldHandler, { class: classNames.join(" ") }, figure);

        });

        return createElement('div', null, { class: "chessboard__row" }, ..._fields);

    });

    return createElement('div', null, { class: "chessboard" }, ...rows);;
}

export default render;