import Field from '../Field';
import updateStatus from './updateStatus';
import _turnAction from './_turnAction';
import _setActiveFieldRanges from './_setActiveFieldRanges';
import _filterCapturePossibilities from './_filterCapturePossibilities';

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
        this.lastMove = [];
        this.captureStreaks = [];
        this.captureStreaksActive = [];
        this._filterCapturePossibilities();
        this.captureMode = false;
        this.captures = []; // ids of captured figures during multi capture
        };

    startGame(){
        this.status.game = 'on';
        this.status.team = 'white';
    };

    checkCaptureRange(id){
        for ( const streak of this.captureStreaksActive ){
            if ( id === streak[1]?.id ) return streak[0].capturedId;
        }
    }

    // check if field has a capture possibility
    isInStreak(id){
        let flag = false;
        this.captureStreaks.forEach( captureStreak => {
            if ( captureStreak[0].id === id ) flag = true;
        })
        return flag;
    }

    getField(id){
        let field = null;
        this.fields.forEach( row => {
            row.forEach( _field => {
                if ( _field.id === parseInt(id) ) field = _field;
            })
        });
        return field;
    }

}

Chessboard.prototype.updateStatus = updateStatus;
Chessboard.prototype._turnAction = _turnAction;
Chessboard.prototype._setActiveFieldRanges = _setActiveFieldRanges;
// gather ids of fields which can capture at a time
// according to rule that capturing is obligatory and most captures in streak have precedence
Chessboard.prototype._filterCapturePossibilities = _filterCapturePossibilities;
