import { idFromCoors } from 'Utils/idFromCoors';

const filterRange = function( chessboard, startFieldId = null, captureStreaksSearch = false, capturedFields = [] ){

    const moveRange = [];
    let captureNodes = [];

    if ( !this.range.length ) return { moveRange, captureNodes };

    this.range.forEach( fieldData => {

        const aimField = chessboard.getField( fieldData.id );
        // occupied field except field where streak starts - case when when capture takes place again at starting field
        if ( aimField.figure && startFieldId !== aimField.id ) return;
        const distance = Math.abs( this.vec.x - aimField.vec.x );

        // move
        if ( 
            !captureStreaksSearch
            && distance === 1
            && ( this.direction === fieldData.direction[1] || !this.direction)
            ) moveRange.push(aimField.id);

        if ( distance > 1 ){

            let figuresAmount = 0, capturedId = null;

            for ( let i = 1; i <= distance - 1; i++ ){ // check only fields between, don't include aimField
                const _vec = this.vec.plus( fieldData.direction, i );
                if ( !_vec ) continue;
                const betweenField = chessboard.getField( idFromCoors( _vec.x, _vec.y ) );
                if ( betweenField.figure?.team === this.team ) return;
                if ( betweenField.figure ){
                    figuresAmount++;
                    if ( figuresAmount === 1 ) capturedId = betweenField.id;
                    if ( capturedFields.includes( capturedId ) ) return;
                    if ( figuresAmount > 1 ) return; // two figures in the way
                }
            };

            if ( figuresAmount === 1 ){
                captureNodes = [
                    ...captureNodes, 
                    this._createCaptureNodes({ 
                        field: chessboard.getField(this.fieldId), 
                        aimField, 
                        capturedId,
                        chessboard, 
                        capturedFields,
                        startFieldId
                    })];
            } else if ( !captureStreaksSearch && figuresAmount === 0 && this?.type === 'queen' ) moveRange.push(aimField.id);

        }

    });

    return { moveRange, captureNodes };      
}

export default filterRange;