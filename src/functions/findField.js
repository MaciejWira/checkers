// returns field object given the id

export const findField = (id, fields) => {
    let field = null;
    fields.forEach( row => {
        row.forEach( _field => {
            if ( _field.id === parseInt(id) ){
                field = _field;
            }
        })
    });
    return field;
}