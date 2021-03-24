import { allDirections } from './../helpers/allDirections';
import { idFromCoors } from './../helpers/idFromCoors';
import { chessboardRange } from "./Chessboard/chessboardSettings";

export default class Figure {

    constructor( figure, vec ){
        this.figure = figure;
        const { team, type, direction } = figure;
        this.team = team;
        this.type = type;
        this.vec = vec;

        if ( type === 'pawn' ){
            this.range = this._rangeFields(2);
            this.direction = direction;
        };

        if ( type === 'queen' ){
            this.range = this._rangeFields(7);
        };
    }

    _rangeFields(distance){
        const _fields = [];
        allDirections.forEach( direction => {
            for ( let i = distance; i > 0; i-- ){
                const _vec = this.vec.plus( direction, i );
                if ( !_vec ) continue;
                if ( _vec.x < 1 || _vec.x > chessboardRange[0] || _vec.y < 1 || _vec.y > chessboardRange[1] ) continue;
                _fields.push({ 
                    id: idFromCoors( _vec.x, _vec.y ), 
                    direction }); // direction is for potential checkking a field behind
            }
        });
        return _fields;
    }

    filterRange(chessboard){

        const moveRange = [], captureRange = [];
        
        if ( !this.range.length ) return { moveRange, captureRange };

        this.range.forEach( fieldData => {

            const field = chessboard.getField( fieldData.id );
            if ( field.figure ) return null;
            const distance = Math.abs( this.vec.x - field.vec.x );

            // move
            if ( 
                distance === 1
                && !field.figure
                && ( this.direction === fieldData.direction[1] || !this.direction)
                ) moveRange.push(field.id);

            else if ( distance > 1 ){
                let figuresAmount = 0, capturedId = null;
                for ( let i = 1; i <= distance - 1; i++ ){ // check only fields between, don't include field
                    const _vec = this.vec.plus( fieldData.direction, i );
                    if ( !_vec ) continue;
                    const betweenField = chessboard.getField( idFromCoors( _vec.x, _vec.y ) );
                    if ( betweenField.figure?.team === this.team ) return null;
                    if ( betweenField.figure ){
                        figuresAmount++;
                        if ( figuresAmount === 1 ) capturedId = betweenField.id;
                        if ( figuresAmount > 1 ) return null; // two figures in the way
                    }
                };

                console.log(figuresAmount);

                if ( figuresAmount === 0 && this?.type === 'queen' ) moveRange.push(field.id);
                else if ( figuresAmount === 1 ){
                    captureRange.push({
                        id: field.id,
                        capturedId
                    });
                }
            }

        });

        return { moveRange, captureRange };        
    }

}