import Figure from './Figure';
import { idFromCoors } from './../helpers/idFromCoors';

export default class Field {

    constructor( figure, type, coors, name ){
        this.id = idFromCoors(coors.x, coors.y);
        this.figure = figure ? new Figure(figure, coors) : null;
        this.type = type;
        this.coors = coors;
        this.name = name;
    };

    actionType( activeField, chessboard ){
        // select / deselect
        if ( this.figure && this.figure?.team === chessboard.status.team ){
            if ( chessboard.activeFieldId === this.id ) return 'deselect';
            return 'select';
        } 
        
        // move
        else if ( activeField && this.checkRange( activeField, chessboard.range) ){
            if ( activeField.figure.team === this.figure?.team ) return 'select';
            return 'move';
        }
    }

    checkRange( activeField, range ){

        if ( !range || !activeField ) return false;
    
        // disable range field if there is a figure from the same team
        if ( this.figure?.team === activeField.figure.team ) return false;
    
        // to disable selection
        if ( this.id === activeField.id ) return true;
        
        // standard move in basic range
        if ( range.includes(this.id) ){
            return true;
        };
    
        return false;
    
    }

}