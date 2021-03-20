import { initialSet } from './../helpers/initialSet';
const chessboardLength = initialSet.length;
const chessboardRange = [ [1,1], [chessboardLength, chessboardLength] ];

export default class Vec {

    constructor( x, y, distance ){
        this.x = x;
        this.y = y;
        this.distance = distance;
    };

    move(direction = [0,0]){
        const x = this.x + ( direction[0] * this.distance );
        const y = this.y + ( direction[1] * this.distance );
        if ( x < chessboardRange[0][0] || x > chessboardRange[1][0] ) return null;
        if ( y < chessboardRange[0][1] || y > chessboardRange[1][1] ) return null;
        return new Vec( x, y, this.distance );
    };

}