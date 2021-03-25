export const biggestLength = arr => {

    let biggest = 0;

    arr.forEach( el => {
        if ( el.length > biggest ) biggest = el.length
    })
    
    return arr.filter( el => el.length === biggest)

}