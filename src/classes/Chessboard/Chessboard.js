import { updateStatus } from './updateStatus';
import Field from '../Field';
import { findField } from './../../functions/findField';
import { allDirections } from './../../helpers/allDirections';

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
        this.moveRange = [];
        this.captureRange = [];
    };

    updateStatus(id, actionType, capture){
        updateStatus(id, actionType, capture, this)
    };

    setRanges(){
        if ( !this.activeFieldId ) return;
        const activeField = findField( this.activeFieldId, this.fields );
        const _moveRange = [], _captureRange = [];

        allDirections.forEach( direction => {

            // const field = fieldFromVec(activeField, direction);
            const field = activeField.fieldFromVec( direction, this.fields );
            if ( !field ) return;

            // move
            if ( !field.figure && activeField.figure.direction === direction[1] ) _moveRange.push(field.id);

            // capture
            if ( field.figure ){
                // check if field behind is empty
                const fieldBehind = field.fieldFromVec( direction, this.fields );
                if ( !fieldBehind ) return;
                if ( !fieldBehind.figure ){
                    _captureRange.push({
                        id: fieldBehind.id,
                        capturedId: field.id
                    })
                } else return null;
            }

        });

        this.moveRange = _moveRange;
        this.captureRange = _captureRange;
    }

    checkCaptureRange(id){
        for ( const field of this.captureRange ){
            if ( id === field.id ) return field.capturedId;
        };
        return null;
    }

}