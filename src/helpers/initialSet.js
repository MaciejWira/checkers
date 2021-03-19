const emptyRow = [
    '', '', '', '', '', '', '', ''
];

const wp = 'white-pawn-down', bp = 'black-pawn-up', wq = 'white-queen', bq = 'black-queen';

export const initialSet = [
    [wp, '', wp, '', wp, '', wp, ''],
    ['', wp, '', wp, '', wp, '', wp],
    emptyRow,
    emptyRow,
    emptyRow,
    emptyRow,
    [bp, '', bp, '', bp, '', bp, ''],
    ['', bp, '', bp, '', bp, '', bp],
]