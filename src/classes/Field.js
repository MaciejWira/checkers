import Figure from './Figure';

export default class Field {

    constructor( id, figureCode, type, coors, name ){
        this.id = id;
        this.figure = figureCode ? new Figure(figureCode, coors) : null;
        this.type = type;
        this.coors = coors;
        this.name = name;
    }

}