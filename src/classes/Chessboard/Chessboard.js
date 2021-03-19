import { updateStatus } from './updateStatus';

export default class Chessboard {

    constructor(fields){
        this.fields = fields;
        this.status = {
            game: 'on', // before / on / finished
            team: 'white', // white / black
        };
        this.activeFieldId = null;
    };

    updateStatus(id, actionType){
        updateStatus(id, actionType, this)
    }

}