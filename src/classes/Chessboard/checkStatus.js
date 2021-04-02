const checkStatus = function(){

    if ( this.status.game === 'on' ){

        // if there is no possible move for current team:
        // 1. No figures
        // 2. Blocked moves
        // then it's game over

        if ( !this.captureStreaks.length && !this.movePossibilities.length ) this.endGame();

    }

}

export default checkStatus;