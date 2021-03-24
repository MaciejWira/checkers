import Field from '../Field';
import { idFromCoors } from './../../helpers/idFromCoors';
import Figure from './../Figure';

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

    updateStatus(id, actionType, captureId){
        // updateStatus(id, actionType, capture, this);
        if ( this.status.game === 'on' ){

            // capture
            if ( actionType === 'capture' && captureId ){
                this._moveAction(id, captureId);
            } 
            
            // field with a figure
            if ( actionType === 'select' ){
                this.activeFieldId = id;
            } 
            
            // for disactivating activeField
            else if ( actionType === 'deselect' ) {
                this.activeFieldId = null;
            } 
            
            else if ( actionType === 'move' ) {
                this._moveAction(id, this);
            };
    
        } 
        this._setActiveFieldRanges();
        this._filterCapturePossibilities();
    };

    _moveAction(id, captureId){
        const updatedFields = this.fields.map( row => {
            return row.map( field => {
                if ( field.id === id ){
                    const activeField = this.getField(this.activeFieldId);
                    let figure = activeField.figure.figure;
                    if ( 
                        ( activeField.figure.direction === -1 && field.vec.y === 1 ) 
                        || ( activeField.figure.direction === 1 && field.vec.y === this.fields.length ) 
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
                else if ( field.id === this.activeFieldId || field.id === captureId ){
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
    
        this.moveRange = [];
        this.captureRange = [];
        this.fields = updatedFields;
        this.lastMove = [ id, this.activeFieldId ];
        this.activeFieldId = null;
        this.status.team = this.status.team === 'white' ? 'black' : 'white';
    }

    _setActiveFieldRanges(){
        if ( !this.activeFieldId ){
            this.moveRange = [];
            this.captureRange = [];
            return;
        };
        const activeField = this.getField( this.activeFieldId );
        const { moveRange, captureRange } = activeField.figure.filterRange( this )
        this.captureRange = captureRange;
        this.moveRange = captureRange.length ? [] : moveRange; // force capture
    }

    // gather ids of fields which can capture at a time
    // according to rule that capturing is obligatory
    _filterCapturePossibilities(){
        const capturePossibilities = [];
        this.fields.forEach( row => {
            row.forEach(field => {
                if ( field.figure?.team !== this.status.team ) return;
                const { captureRange } = field.figure.filterRange( this );
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

    getField(id){
        let field = null;
        this.fields.forEach( row => {
            row.forEach( _field => {
                if ( _field.id === parseInt(id) ){
                    field = _field;
                }
            })
        });
        return field;
    }

}