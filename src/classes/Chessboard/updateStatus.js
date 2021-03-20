import { findField } from './../../functions/findField';
import Figure from './../Figure';
import { initialSet } from './../../helpers/initialSet';
import Field from './../Field';

export const updateStatus = (id, actionType, _this) => {

    const status = _this.status;

    if ( status.game === 'on' ){
        
        // field with a figure
        if ( actionType === 'select' ){
            _this.activeFieldId = id;
        } 
        
        // for disactivating activeField
        else if ( actionType === 'deselect' ) {
            _this.activeFieldId = null;
        } 
        
        else if ( actionType === 'move' ) {
            const updatedFields = _this.fields.map( row => {
                return row.map( field => {
                    if ( field.id === id ){
                        const activeField = findField(_this.activeFieldId, _this.fields);
                        let figure = activeField.figure.figure;
                        if ( 
                            ( activeField.figure.direction === -1 && field.coors.y === 1 ) 
                            || ( activeField.figure.direction === 1 && field.coors.y === initialSet.length ) 
                            ) figure = { 
                                team: activeField.figure.team, direction: activeField.figure.team, type: 'queen'
                            };
                        return new Field(
                            new Figure( figure, field.coors),
                            field.type,
                            field.coors,
                            field.name,
                        );
                    }
                    else if ( field.id === _this.activeFieldId ){
                        return new Field(
                            null,
                            field.type,
                            field.coors,
                            field.name,
                        )
                    }
                    else return field;
                })
            });
            _this.fields = updatedFields;
            _this.activeFieldId = null;
            status.team = status.team === 'white' ? 'black' : 'white';
        }

    } 

}
