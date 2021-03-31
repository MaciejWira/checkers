import { nodesToStreaks } from "../../functions/streakToArr";
import { biggestLength } from './../../functions/biggestLength';

const _filterCapturePossibilities = function(){
    const captureStreaks = [];
    this.fields.forEach( row => {
        row.forEach(field => {
            if ( field.figure?.team !== this.status.team ) return;
            const { captureNodes } = field.figure.filterRange( this, field.id );
            if ( captureNodes.length ) captureStreaks.push( nodesToStreaks(captureNodes) );
        })
    });
    const _captureStreaks = captureStreaks.reduce((prev, curr) => [ ...prev, ...curr], []);
    this.captureStreaks = biggestLength(_captureStreaks);
}

export default _filterCapturePossibilities;
