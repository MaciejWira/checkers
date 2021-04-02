import { nodesToStreaks } from "../../functions/streakToArr";
import { biggestLength } from '../../functions/biggestLength';

const _filterPossibilities = function(){
    const captureStreaks = [];
    const movePossibilities = [];
    this.fields.forEach( row => {
        row.forEach(field => {
            if ( field.figure?.team !== this.status.team ) return;
            const { captureNodes, moveRange } = field.figure.filterRange( this, field.id );
            if ( moveRange.length ) movePossibilities.push( field.id )
            if ( captureNodes.length ) captureStreaks.push( nodesToStreaks(captureNodes) );
        })
    });
    const _captureStreaks = captureStreaks.reduce((prev, curr) => [ ...prev, ...curr], []);
    this.captureStreaks = biggestLength(_captureStreaks);
    this.movePossibilities = movePossibilities;
}

export default _filterPossibilities;
