import './chessboardComponent.scss'; 
import { checkRange } from './helpers/checkRange';
import { findField } from './../../functions/findField';
import { rangeModifier } from './helpers/rangeModifier';

// component for rendering chessboard object
const chessboardComponent = (chessboard, stage) => {

    const activeField = findField(chessboard.activeFieldId, chessboard.fields);
    // modify range in terms of figure capturing possibility
    let _range = activeField ? rangeModifier(activeField, chessboard) : null;

    const rows = chessboard.fields.map( row => {

        // set DOM element for each field
        const _fields = row.map( field => {
            
            const classNames = [ "chessboard__field", `chessboard__field--${field.type}` ];
            let actionType = '';

            if ( field.figure && field.figure?.team === chessboard.status.team ){
                actionType = 'select';
                if ( chessboard.activeFieldId === field.id ) actionType = 'deselect';
            } else if ( activeField && checkRange( activeField, field, _range) ){
                actionType = 'move';
                if ( activeField.figure.team === field.figure?.team ) actionType = 'select';
            }

            if ( actionType ) classNames.push( "js-clickable chessboard__field--clickable" );
            if ( chessboard.activeFieldId === field.id ) classNames.push( "chessboard__field--active" );

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
                    data-range="${field.figure ? JSON.stringify(_range) : "[]"}"
                    data-action="${actionType}"
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
                chessboard.updateStatus( parseInt(field.getAttribute('data-id')), field.getAttribute('data-action') );
                chessboardComponent(chessboard, stage);
            });
        });

};

export default chessboardComponent;