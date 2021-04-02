const emptyRow = [
    '', '', '', '', '', '', '', ''
];

const white = { team: 'white', direction: 1 }
const black = { team: 'black', direction: -1 }

const wp = { ...white, type: 'pawn' }, 
      bp = { ...black, type: 'pawn' }, 
      wq = { ...white, type: 'queen' }, 
      bq = { ...black, type: 'queen' };

export const chessboardSet = [
    [ '', bp, '', bp, '', bp, '', bp],
    [bp, '', bp, '', bp, '', bp, ''],
    emptyRow,
    [ wp, '', '', '', '', '', '', ''],
    emptyRow,
    emptyRow,
    ]; 

export const chessboardRange = [ [1,1], [ chessboardSet[0].length, chessboardSet.length ] ];