import { findField } from '../../../functions/findField';

export const checkRange = ( activeField, field, range ) => {

    if ( !range || !activeField ) return false;

    // disable range field if there is a figure from the same team
    if ( field.figure?.team === activeField.figure.team ) return false;

    // to disable selection
    if ( field.id === activeField.id ) return true;
    
    // standard move in basic range
    if ( range.includes(field.id) ){
        return true;
    };

    return false;

    // more range conditions - check if the above conditions are missed and nothing is returned

    // const _filteredRange = _range.filter( rangeFieldCoors => {

    // });

}