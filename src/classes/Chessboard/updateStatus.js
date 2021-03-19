import { findField } from './../../functions/findField';
import Figure from './../Figure';

export const updateStatus = (id, actionType, _this) => {

    const status = _this.status;

    if ( status.game === 'on' ){
        
        // field with a figure
        if ( actionType === 'select' ){
            _this.activeFieldId = id;
        } 
        
        // for disactivating activeField
        else if ( actionType === 'deselect' ) {
            console.log('heee');
            _this.activeFieldId = null;
        } 
        
        else if ( actionType === 'move' ) {
            const updatedFields = _this.fields.map( row => {
                return row.map( field => {
                    if ( field.id === id ){
                        const activeField = findField(_this.activeFieldId, _this.fields);
                        let figureCode = activeField.figure.figureCode;
                        if ( 
                            ( activeField.figure.direction === 'down' && field.coors.y === 1 ) 
                            || ( activeField.figure.direction === 'up' && field.coors.y === 8 ) 
                            ) figureCode = `${activeField.figure.team}-queen`;
                        console.log(field.coors);
                        return { 
                            ...field, 
                            figure: new Figure( figureCode, field.coors) 
                        };
                    }
                    else if ( field.id === _this.activeFieldId ) return { ...field, figure: null }
                    else return field;
                })
            });
            _this.fields = updatedFields;
            _this.activeFieldId = null;
            status.team = status.team === 'white' ? 'black' : 'white';
        }

    } 

}
