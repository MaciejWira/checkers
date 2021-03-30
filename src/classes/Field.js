import Figure from './Figure';
import { idFromCoors } from './../helpers/idFromCoors';
import Vec from './Vec';

export default class Field {

    constructor( figure, type, coors, name = '' ){
        this.id = idFromCoors(coors.x, coors.y);
        this.vec = new Vec( coors.x, coors.y );
        this.figure = figure ? new Figure(figure, this.vec, this.id) : null;
        this.type = type;
        this.name = name;
    };

    actionType( activeField, chessboard ){

        if ( chessboard.status.game !== 'on' ) return [];

        // if there is a capture possibility, then it has priority
        // filter out fields with figures ( to not disable 'move to' fields )
        if ( 
            chessboard.captureStreaks.length 
            && !chessboard.isInStreak( this.id ) 
            && this.figure
            ){
            return [];
        }

        // capture
        else if ( chessboard.checkCaptureRange(this.id) ){
            return ['capture', chessboard.checkCaptureRange(this.id)];
        }

        // deselect
        else if ( this.id === chessboard.activeFieldId && !chessboard.captureMode ) return ['deselect'];

        // select
        else if ( this.figure?.team === chessboard.status.team && !chessboard.captureMode ) return ['select'];
        
        // move
        else if ( activeField && chessboard.moveRange.includes(this.id) && !chessboard.captureMode ){
            return ['move'];
        }

        else return [];
    }

}