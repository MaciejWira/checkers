const emptyRow = [
    '', '', '', '', '', '', '', ''
];

const white = { team: 'white', direction: -1 }
const black = { team: 'black', direction: 1 }

const wp = { ...white, type: 'pawn' }, 
      bp = { ...black, type: 'pawn' }, 
      wq = { ...white, type: 'queen' }, 
      bq = { ...black, type: 'queen' };

export const initialSet = [
        [wp, '', wp, '', wp, '', wp, ''],
        emptyRow,
        emptyRow,
        ['', wp, '', wp, '', wp, '', wp],
        [bp, '', bp, '', bp, '', bp, ''],
        emptyRow,
        emptyRow,
        ['', bp, '', bp, '', bp, '', bp],
    ];