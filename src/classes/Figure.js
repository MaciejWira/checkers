import Vec from "./Vec";
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
                _fields.push({ id: idFromCoors( _vec.x, _vec.y ), direction }); // direction is for potential checkking a field behind
            }
        });
        return _fields;
    }

}