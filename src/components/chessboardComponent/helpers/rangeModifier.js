// modify range in terms of figure capturing possibility
import { findField } from './../../../functions/findField';

export const rangeModifier = (activeField, chessboard) => {

    if ( !activeField ) return null;
    
    let _range = activeField.figure?.range.map( fieldId => {

        const field = findField(fieldId, chessboard.fields);

        if ( activeField
            && field.figure?.team 
            && field.figure?.team !== activeField.figure.team 
            && activeField.figure?.range.includes(fieldId) )
        {
            return null;
        } else return fieldId;

    });

    return _range;

}