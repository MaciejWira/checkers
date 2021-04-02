import createElement from '../../functions/createElement';
import infoBox from './../../components/infoBox/infoBox';

const render = function(){

    const rows = this.fields.map( row => {
        const _fields = row.map( field => field.render());
        return createElement('div', null, { class: "chessboard__row" }, ..._fields);
    });

    const infoBoxDOM = infoBox(this);
    return createElement('div', null, { class: "chessboard" }, ...rows, infoBoxDOM);
}

export default render;