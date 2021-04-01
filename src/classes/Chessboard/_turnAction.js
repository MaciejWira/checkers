import Field from '../Field/Field';
import Figure from './../Figure';

const _turnAction = function(id, capturedId){
    if ( capturedId && !this.captureMode){
        this.captureMode = true; // start capture streak
    } 

    // condition for end of capture streak
    if ( this.captureMode && this.captureStreaksActive[0].length <= 2){
        this.captureMode = false;
        this.captures = [ ...this.captures, capturedId ];
        this.captureStreaks = [];
        this.captureStreaksActive = [];
    }

    const updatedFields = this.fields.map( row => {
        return row.map( field => {
            if ( field.id === id ){
                const activeField = this.getField(this.activeFieldId);
                let figure = activeField.figure.figure;
                // don't turn into queen if it is during multi capturing
                if ( 
                    ( activeField.figure.direction === -1 && field.vec.y === 1 && !this.captureMode) 
                    || ( activeField.figure.direction === 1 && field.vec.y === this.fields.length && !this.captureMode) 
                    ){
                        figure = { 
                            team: activeField.figure.team, 
                            direction: activeField.figure.team, 
                            type: 'queen'
                        };
                    }
                return new Field(
                    new Figure( figure, field.vec),
                    field.type,
                    field.vec,
                    field.name,
                    this
                );
            }
            // capturing of all fields will be rendered after multi capturing
            else if ( 
                field.id === this.activeFieldId
                || this.captures.includes(field.id)
                && !this.captureMode
                ){
                return new Field(
                    null,
                    field.type,
                    field.vec,
                    field.name,
                    this
                )
            }
            else return field;
        })
    });

    this.moveRange = [];
    this.fields = updatedFields;
    this.lastMove = [ id, this.activeFieldId ];
    if ( !this.captureMode ){
        this.activeFieldId = null;
        this.status.team = this.status.team === 'white' ? 'black' : 'white';
        this.captures = [];
    } else {
        this.activeFieldId = id;
        this.captures = [ ...this.captures, capturedId ];
    }
}

export default _turnAction;