import Field from './Field';

const rowLetterIds = [
    'H','G','F','E','D','C','B','A'
];

export default class Fields {

    constructor(plan){
        this.fields = plan.map( (row, rowIndex) => {
            return row.map( (figureCode, fieldIndex) => {
                const columnId = fieldIndex + 1,
                      rowId = 8 - rowIndex,
                      type = ( rowIndex + fieldIndex ) % 2 === 0 ? 'light' : 'dark';
                return new Field( 
                    parseInt( "" + columnId + rowId ), // id
                    figureCode, 
                    type, 
                    { x: columnId, y: rowId },
                    rowLetterIds[rowIndex] + columnId)
            })
        });
    };

}