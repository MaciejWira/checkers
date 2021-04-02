import createElement from '../../functions/createElement';

const render = function(){

    const rows = this.fields.map( row => {

        const _fields = row.map( field => field.render());

        return createElement('div', null, { class: "chessboard__row" }, ..._fields);

    });

    return createElement('div', null, { class: "chessboard" }, ...rows);;
}

export default render;