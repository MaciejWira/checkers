// example data structure
// const a = [
// 	{ id: 'b', nodes: [
//   	{ id: 'd', nodes: []}, 
//     { id: 'e', nodes: [ 
//     		{ id: 'f', nodes: []}, 
//       	{ id: 'g', nodes: []}
//       ]}
//     ]},
//   { id: 'c', nodes: [] },
//   { id: 'k', nodes: [] }
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