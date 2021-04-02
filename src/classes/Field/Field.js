import Figure from '../Figure/Figure';
import { idFromCoors } from '../../helpers/idFromCoors';
import Vec from '../Vec';
import actionType from './actionType';
import render from './render';

export default class Field {

    constructor( figure, type, coors, name = '', chessboard ){
        this.id = idFromCoors(coors.x, coors.y);
        this.vec = new Vec( coors.x, coors.y );
        this.figure = figure ? new Figure(figure, this.vec, this.id) : null;
        this.type = type;
        this.name = name;
        this.chessboard = chessboard;
    };

}

Field.prototype.actionType = actionType;
Field.prototype.render = render;