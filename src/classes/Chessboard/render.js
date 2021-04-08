import createElement from 'Utils/createElement';
import InfoBox from 'Components/InfoBox/InfoBox';
import styles from './Chessboard.scss';
const { container, row: rowClass } = styles;

const render = function(){

    const rows = this.fields.map( row => {
        const _fields = row.map( field => field.render());
        return createElement('div', null, { class: rowClass }, ..._fields);
    });

    const InfoBoxDOM = InfoBox(this);
    return createElement(
            'div', 
            null, 
            { class: container }, 
            ...rows, InfoBoxDOM
        );
}

export default render;