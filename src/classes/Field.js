import Figure from './Figure';
import { idFromCoors } from './../helpers/idFromCoors';
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

        // if there is a capture possibility, then it has priority
        // filter out fields with figures ( to not disable 'move to' fields )
        if ( 
            chessboard.capturePossibilities.length 
            && !chessboard.capturePossibilities.includes( this.id ) 
            && this.figure
            ){
            return [];
        }

        // capture
        if ( chessboard.checkCaptureRange(this.id) ){
            return ['capture', chessboard.checkCaptureRange(this.id)];
        };

        // deselect
        if ( this.id === chessboard.activeFieldId ) return ['deselect'];

        // select
        if ( this.figure?.team === chessboard.status.team ) return ['select'];
        
        // move
        if ( activeField && chessboard.moveRange.includes(this.id) ){
            return ['move'];
        }

        else return [];
    }

}