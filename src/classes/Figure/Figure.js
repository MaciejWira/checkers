import _rangeFields from './_rangeFields';
import filterRange from './filterRange';
import _createCaptureNodes from './_createCaptureNodes';
import createElement from 'Utils/createElement';
import styles from './Figure.scss';

export default class Figure {

    constructor( figure, vec, fieldId ){
        this.figure = figure;
        const { team, type, direction } = figure;
        this.team = team;
        this.type = type;
        this.vec = vec;
        this.fieldId = fieldId;

        if ( type === 'pawn' ){
            this.range = this._rangeFields(2);
            this.direction = direction;
        };

        if ( type === 'queen' ){
            this.range = this._rangeFields(7);
        };
    }

    render(){
        return createElement(
            'div', 
            null, 
            { class: `${styles.container} ${styles[this.team]} ${styles[this.type]}`},
            this.type !== 'queen' ? null : createElement(
                'span',
                null,
                { class: styles.label },
                document.createTextNode('Q')
            )
        )
    }

}

Figure.prototype._rangeFields = _rangeFields;
// filter range according to chessboard status
Figure.prototype.filterRange = filterRange;
// create capture streaks as nested objects with nodes
Figure.prototype._createCaptureNodes = _createCaptureNodes;