// example data structure
// const a = [
// 	{ id: 'b', capturedId:'x', nodes: [
//   	{ id: 'd', capturedId:'x', nodes: []}, 
//     { id: 'e', capturedId:'x', nodes: [ 
//     		{ id: 'f', capturedId:'x', nodes: []}, 
//       	{ id: 'g', capturedId:'x', nodes: []}
//       ]}
//     ]},
//   { id: 'c', capturedId:'x', nodes: [] },
//   { id: 'k', capturedId:'x', nodes: [] }
// ];

export const streakToArray = arr => {

  return arr.reduce((prev, curr) => {
    const _curr = {...curr} ;
  	if ( !_curr.accumulated ) _curr.accumulated = [ _curr.id ];
    if ( !_curr.nodes?.length ) return [ ...prev, _curr.accumulated ];
    else {
      _curr.nodes = _curr.nodes.map( node => ({ ...node, accumulated: [..._curr.accumulated, node.id] }));
      const result = streakToArray(_curr.nodes);
      return [ ...prev, ...result ]
    };
  }, []);

}

export const nodesToStreaks = arr => {

  return arr.reduce((prev, curr) => {
    const _curr = {...curr} ;
  	if ( !_curr.accumulated ){
      _curr.accumulated = [{ 
        id: _curr.id, 
        capturedId: !_curr.nodes?.length ? null : _curr.capturedId }];
    }
    if ( !_curr.nodes?.length ) return [ ...prev, _curr.accumulated ];
    else {
      _curr.nodes = _curr.nodes.map( node => {
        return { 
          ...node, 
          accumulated: [
            ..._curr.accumulated, 
            { id: node.id, capturedId: !node.nodes?.length ? null : node.capturedId }] 
          }
      });
      const result = nodesToStreaks(_curr.nodes);
      return [ ...prev, ...result ]
    };
  }, []);

}