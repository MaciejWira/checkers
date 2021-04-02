const actionType = function( chessboard ){
        
    if ( chessboard.status.game !== 'on' ) return [];

    // if there is a capture possibility, then it has priority
    // filter out fields with figures ( to not disable 'move to' fields )
    if ( 
        chessboard.captureStreaks.length 
        && !chessboard.isInStreak( this.id ) 
        && this.figure
        ){
        return [];
    }

    // capture
    else if ( chessboard.checkCaptureRange(this.id) ){
        return ['capture', chessboard.checkCaptureRange(this.id)];
    }

    // deselect
    else if ( this.id === chessboard.activeFieldId && !chessboard.captureMode ) return ['deselect'];

    // select
    else if ( 
        chessboard.isInStreak( this.id ) ||
        ( this.figure?.team === chessboard.status.team 
            && !chessboard.captureMode 
            && chessboard.movePossibilities.includes(this.id) )
        ) return ['select'];
    
    // move
    else if ( chessboard.moveRange.includes(this.id) && !chessboard.captureMode ){
        return ['move'];
    }

    else return [];

}

export default actionType;