import { allDirections } from './../helpers/allDirections';
import { idFromCoors } from './../helpers/idFromCoors';
import { chessboardRange } from "./Chessboard/chessboardSettings";
import Field from './Field';

export default class Figure {

    constructor( figure, vec, fieldId ){
        this.figure = figure;
        const { team, type, direction } = figure;
        this.team = team;
        this.type = type;
        this.vec = vec;
        this.fieldId = fieldId;

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

    // filter range according to chessboard status
    filterRange( chessboard, captureStreaksSearch = false, excludedFields = [] ){

        const moveRange = [], captureRange = [];
        let captureNodes = [];

        if ( !this.range.length ) return { moveRange, captureRange };

        this.range.forEach( fieldData => {

            const aimField = chessboard.getField( fieldData.id );
            if ( aimField.figure ) return null;
            const distance = Math.abs( this.vec.x - aimField.vec.x );

            // move
            if ( 
                !captureStreaksSearch
                && distance === 1
                && !aimField.figure
                && ( this.direction === fieldData.direction[1] || !this.direction)
                ) moveRange.push(aimField.id);

            if ( distance > 1 ){
                let figuresAmount = 0, capturedId = null;
                for ( let i = 1; i <= distance - 1; i++ ){ // check only fields between, don't include aimField
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

                if ( figuresAmount === 1 ){
                    if ( !captureStreaksSearch ){
                        captureRange.push({
                            id: aimField.id,
                            capturedId
                        });
                    };
                    captureNodes = [...captureNodes, this.captureStreaks( chessboard.getField(this.fieldId), aimField, chessboard, excludedFields )];
                } else if ( !captureStreaksSearch && figuresAmount === 0 && this?.type === 'queen' ) moveRange.push(aimField.id);

            }

        });

        return { moveRange, captureRange, captureNodes };        
    }

    captureStreaks( field, aimField, chessboard, excludedFields = [] ){

        const node = {
            id: field.id,
            nodes: []
        };

        if ( excludedFields.includes( field.id ) || excludedFields.includes( aimField.id ) ) return node;
        // specify this more
        const _excludedFields = [ ...excludedFields, field.id ];

        const fakeField = new Field( this.figure, field.type, { x: aimField.vec.x , y: aimField.vec.y } );
        const { captureNodes } = fakeField.figure.filterRange( chessboard, true, _excludedFields );
        node.nodes = captureNodes.length ? captureNodes : [{ id: aimField.id, nodes: []}];
        return node;
    }

}