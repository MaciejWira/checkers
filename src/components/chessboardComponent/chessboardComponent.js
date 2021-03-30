import './chessboardComponent.scss'; 

// component for rendering chessboard object
const chessboardComponent = chessboard => {

    const activeField = chessboard.getField(chessboard.activeFieldId);

    const rows = chessboard.fields.map( row => {

        // set DOM element for each field
        const _fields = row.map( field => {

            const classNames = [ "chessboard__field", `chessboard__field--${field.type}` ];

            const [ actionType, capture ] = field.actionType( activeField, chessboard );

            if ( actionType ) classNames.push( "js-clickable chessboard__field--clickable" );
            if ( 
                chessboard.activeFieldId === field.id 
                || chessboard.lastMove.includes(field.id) 
                ) classNames.push( "chessboard__field--highlighted" );

            const figure = !field.figure ? '' 
                            : 
                            `<div 
                                class="chessboard__figure ${field.figure.team} ${field.figure.type}">
                                </div>`;

            return `
                <div 
                    data-id="${field.id}"
                    data-name="${field.name}"
                    data-coors-x="${field.vec.x}"
                    data-coors-y="${field.vec.y}"
                    data-range="${field.figure ? JSON.stringify(chessboard.moveRange) : "[]"}"
                    data-action="${actionType ? actionType : ""}"
                    data-capture="${capture ? capture : ""}"
                    class="${classNames.join(" ")}">
                    ${figure}
                </div>`;
        });

        return `
                <div>
                    <div class="chessboard__row">
                        ${_fields.join("")}
                    </div>
                </div>
            `;
    });

    return rows.join("");

};

export default chessboardComponent;