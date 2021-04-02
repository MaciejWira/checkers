import Field from './../Field/Field';

const _createCaptureNodes = function({ field, aimField, capturedId, chessboard, capturedFields = [], startFieldId }){
    const node = {
        id: field.id,
        capturedId,
        nodes: []
    };

    const _capturedFields = [ ...capturedFields, capturedId ];
    const fakeField = new Field( this.figure, field.type, { x: aimField.vec.x , y: aimField.vec.y }, chessboard );
    const { captureNodes } = fakeField.figure.filterRange( chessboard, startFieldId, true, _capturedFields );
    node.nodes = captureNodes.length ? captureNodes : [{ id: aimField.id, nodes: []}];
    return node;
}

export default _createCaptureNodes;