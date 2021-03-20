import { updateStatus } from './updateStatus';
import Field from '../Field';
import { findField } from './../../functions/findField';
import { allDirections } from './../../helpers/allDirections';
import { idFromCoors } from './../../helpers/idFromCoors';

const rowLetterIds = [
    'H','G','F','E','D','C','B','A'
];

export default class Chessboard {

    constructor( set ){
        this.fields = set.map( (row, rowIndex) => {
            return row.map( (figure, fieldIndex) => {
                const columnId = fieldIndex + 1,
                      rowId = set.length - rowIndex,
                      // field types are light / dark to not confuse with figures types white / black
                      type = ( rowIndex + fieldIndex ) % 2 === 0 ? 'light' : 'dark';
                return new Field( 
                    figure, 
                    type, 
                    { x: columnId, y: rowId },
                    rowLetterIds[rowIndex] + columnId // field name
                    )
            })
        });
        this.status = {
            game: 'on', // before / on / finished
            team: 'white', // white / black
        };
        this.activeFieldId = null;
        this.range = [];
    };

    updateStatus(id, actionType){
        updateStatus(id, actionType, this)
    };

    setRange(){
        if ( !this.activeFieldId ) return;
        const activeField = findField( this.activeFieldId, this.fields );

        const _range = [];

        const fieldFromVec = (field, direction) => {
            const vec = field.figure.range.move( direction );
            if ( !vec ) return null;
            return findField( idFromCoors( vec.x, vec.y ), this.fields );
        }

        allDirections.forEach( direction => {

            const field = fieldFromVec(activeField, direction);
            if ( !field ) return;

            // move
            if ( !field.figure && activeField.figure.direction === direction[1] ) _range.push(field.id);

            // capture
            if ( field.figure ){
                // check if field behind is empty
                const fieldBehind = fieldFromVec(field, direction);
                if ( !fieldBehind ) return;
                if ( !fieldBehind.figure ){
                    _range.push(fieldBehind.id)
                } else return null;
            }

        });

        this.range = _range;
        console.log(_range);

        // this.range = activeField.figure?.rangeFields.map( fieldId => {
    
        //     const field = findField(fieldId, this.fields);
    
        //     if ( activeField
        //         && field.figure?.team 
        //         && field.figure?.team !== activeField.figure.team 
        //         && activeField.figure?.rangeFields.includes(fieldId) )
        //     {
        //         return null;
        //     } else return fieldId;
    
        // });
    }

}