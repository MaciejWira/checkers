export default class Figure {

    constructor(figureCode, coors){
        this.figureCode = figureCode;
        const figureDetails = figureCode.split("-");
        const [ team, type, direction ] = figureDetails;
        this.team = team;
        this.type = type;
        this.direction = direction;

        const directionFactor = direction === 'down' ? -1 : 1;
        const { x, y } = coors;
        this.range = null;
        if ( type === 'pawn' ){
            const range = [
                [ x - 1, y + directionFactor ],
                [ x + 1, y + directionFactor ]
            ];
            this.range = range
                            .filter( coors => {
                                if (
                                    coors[0] >= 1 && coors[0] <= 8
                                    && coors[1] >= 1 && coors[1] <= 8
                                ){
                                    return true;
                                } else return false
                            })
                            .map( coors => {
                                // for easier injecting to html
                                return parseInt(coors.join(""))
                            });
        }
    }

}