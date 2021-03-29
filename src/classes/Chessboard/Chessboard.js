import Field from '../Field';
import Figure from './../Figure';
import { nodesToStreaks, streakToArray } from './../../functions/streakToArr';
import { biggestLength } from './../../functions/biggestLength';

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

    updateStatus(id, actionType, capturedId){
        // updateStatus(id, actionType, capture, this);
        if ( this.status.game === 'on' ){

            // capture
            if ( actionType === 'capture' && capturedId ){
                this._turnAction(id, capturedId);
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
                this._turnAction(id);
            };
    
        } 
        
        if ( !this.activeFieldId ) this._filterCapturePossibilities();
        else this._setActiveFieldRanges();

    };

    _turnAction(id, capturedId){
        if ( capturedId && !this.captureMode){
            this.captureMode = true; // start capture streak
        } 

        // condition for end of capture streak
        if ( this.captureMode && this.captureStreaksActive[0].length <= 2){
            this.captureMode = false;
            this.captures = [ ...this.captures, capturedId ];
            this.captureStreaks = [];
            this.captureStreaksActive = [];
        }

        const updatedFields = this.fields.map( row => {
            return row.map( field => {
                if ( field.id === id ){
                    const activeField = this.getField(this.activeFieldId);
                    let figure = activeField.figure.figure;
                    // don't turn into queen if it is during multi capturing
                    if ( 
                        ( activeField.figure.direction === -1 && field.vec.y === 1 && !this.captureMode) 
                        || ( activeField.figure.direction === 1 && field.vec.y === this.fields.length && !this.captureMode) 
                        ){
                            figure = { 
                                team: activeField.figure.team, 
                                direction: activeField.figure.team, 
                                type: 'queen'
                            };
                        }
                    return new Field(
                        new Figure( figure, field.vec),
                        field.type,
                        field.vec,
                        field.name,
                    );
                }
                // capturing of all fields will be rendered after multi capturing
                else if ( 
                    field.id === this.activeFieldId
                    || this.captures.includes(field.id)
                    && !this.captureMode
                    ){
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
        this.fields = updatedFields;
        this.lastMove = [ id, this.activeFieldId ];
        if ( !this.captureMode ){
            this.activeFieldId = null;
            this.status.team = this.status.team === 'white' ? 'black' : 'white';
            this.captures = [];
        } else {
            this.activeFieldId = id;
            this.captures = [ ...this.captures, capturedId ];
        }
    }

    _setActiveFieldRanges(){
        if ( !this.activeFieldId ){
            this.moveRange = [];
            return;
        };
        const activeField = this.getField( this.activeFieldId );

        if ( this.captureMode ){
            this.captureStreaksActive = this.captureStreaksActive
                                            .map( streak => streak.slice(1))
                                            .filter( streak => streak[0].id === this.activeFieldId)
            console.log(this.activeFieldId);
            console.log(this.captureStreaksActive);
        } else if ( this.captureStreaks.length ){ // active field can capture
            this.captureStreaksActive = this.captureStreaks.filter( streak => streak[0].id === this.activeFieldId );
            console.log(this.captureStreaksActive);
        } else {
            this.moveRange = activeField.figure.filterRange( this, this.activeFieldId ).moveRange
        }
    }

    // gather ids of fields which can capture at a time
    // according to rule that capturing is obligatory and most captures in streak have precedence
    _filterCapturePossibilities(){
        const captureStreaks = [];
        this.fields.forEach( row => {
            row.forEach(field => {
                if ( field.figure?.team !== this.status.team ) return;
                const { captureNodes } = field.figure.filterRange( this, field.id );
                if ( captureNodes.length ) captureStreaks.push( nodesToStreaks(captureNodes) );
            })
        });
        const _captureStreaks = captureStreaks.reduce((prev, curr) => [ ...prev, ...curr], []);
        this.captureStreaks = biggestLength(_captureStreaks);
    }

    checkCaptureRange(id){
        for ( const streak of this.captureStreaksActive ){
            if ( id === streak[1]?.id ) return streak[0].capturedId;
        };
        return null;
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
                if ( _field.id === parseInt(id) ){
                    field = _field;
                }
            })
        });
        return field;
    }

}