import { chessboardRange } from 'Classes/Chessboard/chessboardSettings';
import { allDirections } from 'Utils/allDirections';
import { idFromCoors } from 'Utils/idFromCoors';

const _rangeFields = function(distance){
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

export default _rangeFields;