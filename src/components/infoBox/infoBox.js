import './infoBox.scss';
import createElement from './../../functions/createElement';

const infoBox = chessboard => {

    const gameStatus = chessboard.status.game;

    if ( gameStatus === 'on' ) return null;

    let content = null;

    if ( gameStatus === 'before' ){
        const buttonHandler = el => {
            el.addEventListener('click', () => {
                chessboard.status = {
                    game: 'on',
                    team: 'white'
                };
                chessboard.updateStatus();
            });
        }
        content = createElement('button', buttonHandler, { class: 'infobox__button' }, document.createTextNode('Start'))
    } else if ( gameStatus === 'finished' ){
        const buttonHandler = el => {
            el.addEventListener('click', () => {
                chessboard.stage.newGame();
            });
        }
        content = createElement(
                    'div', 
                    null, 
                    {},
                    // children
                    createElement('p', null, { class: 'infobox__paragraph' }, document.createTextNode('End of game!')),
                    document.createTextNode('Winner: '),
                    createElement('strong', null, { class: 'infobox__strong' }, document.createTextNode(chessboard.status.winner)),
                    createElement('br'),
                    createElement('button', buttonHandler, { class: 'infobox__button' }, document.createTextNode('OK'))
                )
    }

    return createElement(
                'div', 
                null, 
                { class: 'infobox' },
                createElement('div', null, { class: 'infobox__content' }, content)
            );

};

export default infoBox;