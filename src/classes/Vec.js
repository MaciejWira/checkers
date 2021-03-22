import { chessboardRange } from "./Chessboard/chessboardSettings";

export default class Vec {

    constructor( x, y ){
        this.x = x;
        this.y = y;
    };

    plus(direction = [0,0], distance){
        const x = this.x + ( direction[0] * distance );
        const y = this.y + ( direction[1] * distance );
        if ( x < chessboardRange[0][0] || x > chessboardRange[1][0] ) return null;
        if ( y < chessboardRange[0][1] || y > chessboardRange[1][1] ) return null;
        return new Vec( x, y );
    };

}