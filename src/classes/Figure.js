import Vec from "./Vec";
import { allDirections } from './../helpers/allDirections';
import { idFromCoors } from './../helpers/idFromCoors';

export default class Figure {

    constructor( figure, coors ){
        this.figure = figure;
        const { team, type, direction } = figure;
        this.team = team;
        this.type = type;

        const { x, y } = coors;

        if ( type === 'pawn' ){
            this.range = new Vec( x, y, 1, this.direction );
            this.direction = direction;
        };

        if ( type === 'queen' ){
            this.range = new Vec( x, y, 8, this.direction );
        };
    }

    get rangeFields(){
        return allDirections
                    .map( direction => {
                        const vec = this.range.move( direction );
                        if ( vec ) return idFromCoors(vec.x, vec.y);
                        else return null
                    })
                    .filter( fieldId => fieldId );
    }

}