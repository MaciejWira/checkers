import { updateStatus } from './updateStatus';
import Field from '../Field';
import { findField } from './../../functions/findField';
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
        this.moveRange = [];
        this.captureRange = [];
        this.lastMove = [];
        this.capturePossibilities = [];
        this._filterCapturePossibilities();
    };

    updateStatus(id, actionType, capture){
        updateStatus(id, actionType, capture, this);
        this._setActiveFieldRanges();
        this._filterCapturePossibilities();
    };

    _setActiveFieldRanges(){
        if ( !this.activeFieldId ) return;
        const activeField = findField( this.activeFieldId, this.fields );
        
        const { moveRange, captureRange } = this._filterRange( activeField )

        this.captureRange = captureRange;
        this.moveRange = captureRange.length ? [] : moveRange; // force capture
    }

    _filterRange( field ){
        
        const moveRange = [], captureRange = [];

        if ( !field.figure?.range?.length ) return { moveRange, captureRange };

        field.figure.range.forEach( fieldData => {

            const _field = findField( fieldData.id, this.fields );
            if ( _field.figure ) return null;
            const distance = Math.abs( field.vec.x - _field.vec.x );

            // move
            if ( 
                distance === 1
                && !_field.figure
                && ( field.figure.direction === fieldData.direction[1] || !field.figure.direction)
                ) moveRange.push(_field.id);

            // capture or queen's move
            else if ( distance > 1 ){
                let figuresAmount = 0, capturedId = null;
                for ( let i = 1; i <= distance - 1; i++ ){ // check only fields between, don't include _field
                    const _vec = field.vec.plus( fieldData.direction, i );
                    if ( !_vec ) continue;
                    const betweenField = findField( idFromCoors( _vec.x, _vec.y ), this.fields );
                    if ( betweenField.figure?.team === field.figure.team ) return null;
                    if ( betweenField.figure ){
                        figuresAmount++;
                        if ( figuresAmount === 1 ) capturedId = betweenField.id;
                        if ( figuresAmount > 1 ) return null; // two figures in the way
                    }
                };

                if ( figuresAmount === 0 && field.figure?.type === 'pawn' ) return null;
                if ( figuresAmount === 0 && field.figure?.type === 'queen' ) moveRange.push(_field.id);
                else if ( figuresAmount === 1 ){
                    captureRange.push({
                        id: _field.id,
                        capturedId
                    });
                }
            }

        });

        return { moveRange, captureRange };
    }

    // gather ids of fields which can capture at a time
    // according to rule that capturing is obligatory
    _filterCapturePossibilities(){
        const capturePossibilities = [];
        this.fields.forEach( row => {
            row.forEach(field => {
                if ( field.figure?.team !== this.status.team ) return;
                const { captureRange } = this._filterRange( field );
                if ( captureRange.length ) capturePossibilities.push( field.id );
            })
        });
        this.capturePossibilities = [...capturePossibilities];
        console.log(capturePossibilities);
    }

    checkCaptureRange(id){
        for ( const field of this.captureRange ){
            if ( id === field.id ) return field.capturedId;
        };
        return null;
    }

}