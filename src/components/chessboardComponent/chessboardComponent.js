import './chessboardComponent.scss'; 
import { findField } from './../../functions/findField';

// component for rendering chessboard object
const chessboardComponent = (chessboard, stage) => {

    const activeField = findField(chessboard.activeFieldId, chessboard.fields);

    const rows = chessboard.fields.map( row => {

        // set DOM element for each field
        const _fields = row.map( field => {

            const classNames = [ "chessboard__field", `chessboard__field--${field.type}` ];

            const [ actionType, capture ] = field.actionType( activeField, chessboard);

            if ( actionType ) classNames.push( "js-clickable chessboard__field--clickable" );
            if ( chessboard.activeFieldId === field.id ) classNames.push( "chessboard__field--highlighted" );
            if ( chessboard.lastMove.includes(field.id) ) classNames.push( "chessboard__field--highlighted" );

            const figure = !field.figure ? '' 
                            : 
                            `<div 
                                class="chessboard__figure ${field.figure.team} ${field.figure.type}">
                                </div>`

            return `
                <div 
                    data-id="${field.id}"
                    data-name="${field.name}"
                    data-coors-x="${field.coors.x}"
                    data-coors-y="${field.coors.y}"
                    data-range="${field.figure ? JSON.stringify(chessboard.moveRange) : "[]"}"
                    data-action="${actionType ? actionType : ""}"
                    data-capture="${capture ? capture : ""}"
                    class="${classNames.join(" ")}">
                    ${figure}
                </div>`;
        });

        return `
            <div class="chessboard__row">
                ${_fields.join("")}
            </div>
            `;
    });

    stage.innerHTML = `<div class="chessboard">${rows.join("")}</div>`;

    // click handlers
    [...document.querySelectorAll('.js-clickable')]
        .forEach( field => {
            field.addEventListener('click', () => {
                chessboard.updateStatus( 
                    parseInt(field.getAttribute('data-id')), 
                    field.getAttribute('data-action'),
                    parseInt(field.getAttribute('data-capture')),
                    );
                chessboard.setRanges();
                chessboardComponent(chessboard, stage);
            });
        });

};

export default chessboardComponent;