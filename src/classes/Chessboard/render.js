import createElement from '../../functions/createElement';
import infoBox from './../../components/infoBox/infoBox';
import styles from './chessboard.scss';
const { container, row: rowClass } = styles;

const render = function(){

    const rows = this.fields.map( row => {
        const _fields = row.map( field => field.render());
        return createElement('div', null, { class: rowClass }, ..._fields);
    });

    const infoBoxDOM = infoBox(this);
    return createElement('div', null, { class: container }, ...rows, infoBoxDOM);
}

export default render;