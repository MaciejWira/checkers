import { findField } from './../../functions/findField';
import Figure from './../Figure';
import Field from './../Field';
import { chessboardSet } from './chessboardSettings';

export const updateStatus = (id, actionType, captureId, _this) => {

    if ( _this.status.game === 'on' ){

        // capture
        if ( actionType === 'capture' && captureId ){
            moveAction(id, _this, captureId);
        } 
        
        // field with a figure
        if ( actionType === 'select' ){
            _this.activeFieldId = id;
        } 
        
        // for disactivating activeField
        else if ( actionType === 'deselect' ) {
            _this.activeFieldId = null;
        } 
        
        else if ( actionType === 'move' ) {
            moveAction(id, _this);
        };

    } 

}

function moveAction(id, _this, captureId){

    const updatedFields = _this.fields.map( row => {
        return row.map( field => {
            if ( field.id === id ){
                const activeField = findField(_this.activeFieldId, _this.fields);
                let figure = activeField.figure.figure;
                if ( 
                    ( activeField.figure.direction === -1 && field.vec.y === 1 ) 
                    || ( activeField.figure.direction === 1 && field.vec.y === chessboardSet.length ) 
                    ) figure = { 
                        team: activeField.figure.team, direction: activeField.figure.team, type: 'queen'
                    };
                return new Field(
                    new Figure( figure, field.vec),
                    field.type,
                    field.vec,
                    field.name,
                );
            }
            else if ( field.id === _this.activeFieldId || field.id === captureId ){
                return new Field(
                    null,
                    field.type,
                    field.vec,
                    field.name,
                )
            }
            else return field;
        })
    });

    _this.moveRange = [];
    _this.captureRange = [];
    _this.fields = updatedFields;
    _this.lastMove = [ id, _this.activeFieldId ];
    _this.activeFieldId = null;
    _this.status.team = _this.status.team === 'white' ? 'black' : 'white';
}
