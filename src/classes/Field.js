import Figure from './Figure';
import { idFromCoors } from './../helpers/idFromCoors';
import { findField } from './../functions/findField';
import Vec from './Vec';

export default class Field {

    constructor( figure, type, coors, name ){
        this.id = idFromCoors(coors.x, coors.y);
        this.vec = new Vec( coors.x, coors.y );
        this.figure = figure ? new Figure(figure, this.vec) : null;
        this.type = type;
        this.name = name;
    };

    actionType( activeField, chessboard ){

        // capture
        if ( chessboard.checkCaptureRange(this.id) ){
            return ['capture', chessboard.checkCaptureRange(this.id)];
        };

        // deselect
        if ( this.id === chessboard.activeFieldId ) return ['deselect'];

        // select
        if ( this.figure?.team === chessboard.status.team ) return ['select'];
        
        // move
        else if ( activeField && this.checkRange( activeField, chessboard.moveRange) ){
            return ['move'];
        }

        else return [];
    }

    checkRange( activeField, range ){

        if ( !activeField || !range.length  ) return false;
    
        // standard move in basic range
        if ( range.includes(this.id) ){
            return true;
        };
    
        return false;
    
    }

}