import Field from '../Field/Field';
import updateStatus from './updateStatus';
import _turnAction from './_turnAction';
import _setActiveFieldRanges from './_setActiveFieldRanges';
import _filterPossibilities from './_filterPossibilities';
import render from './render';
import checkStatus from './checkStatus';

const rowLetterIds = [
    'H','G','F','E','D','C','B','A'
];

export default class Chessboard {

    constructor( set, stage ){
        this.stage = stage;
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
                    rowLetterIds[rowIndex] + columnId, // field name
                    this
                    )
            })
        });
        console.log(this.fields);
        this.activeFieldId = null;
        this.status = {
            game: 'before', // before / on / finished
            team: 'white', // white / black
            winner: '' // white / black
        };
        this.moveRange = []; // possible moves for active field
        this.movePossibilities = []; // fields which can move at a time
        this.lastMove = [];
        this.captureStreaks = [];
        this.captureStreaksActive = [];
        if ( this.status.game === 'on' ) this._filterPossibilities();
        this.captureMode = false;
        this.captures = []; // ids of captured figures during multi capture
        this.history = []; // simplified, for comparission for draws
        this.archive();
        this.drawRepetitions = 3;
        this.queenRepetitions = 0;
        this.queenRepetitionsLimit = 20;
        };

    startGame(){
        this.status.game = 'on';
        this.status.team = 'white';
    };

    endGame(message){
        this.status.game = 'finished';
        this.status.winner = message === 'draw' ? '' : ( this.status.team === 'white' ? 'black' : 'white' );
    }

    archive(){
        const latestTurn = this.fields
                        .map( row => {
                            return row
                                    .map( field => {
                                        return field.figure ? field.figure.team + '-' + field.figure.type : '0';
                                    })
                                    .reduce((prev, curr) => prev + curr + '--', '')
                        })
                        .reduce((prev, curr) => prev + curr + '-', '');
        let counter = 0;
        this.history.forEach( turn => {
            if ( turn === latestTurn ) counter++;
        });
        this.history = [ ...this.history, latestTurn ];
        if ( counter >= this.drawRepetitions ) this.endGame('draw');
        console.log(counter);
        console.log(this.history);
    }

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
Chessboard.prototype.render = render;
Chessboard.prototype._setActiveFieldRanges = _setActiveFieldRanges;
// gather ids of fields which can capture at a time
// according to rule that capturing is obligatory and most captures in streak have precedence
Chessboard.prototype._filterPossibilities = _filterPossibilities;
Chessboard.prototype.checkStatus = checkStatus;
