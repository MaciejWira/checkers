import './infoBox.scss';
import createElement from './../../functions/createElement';

const infoBox = (chessboard, winner = '') => {

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
                chessboard.stage.render();
            });
        }
        content = createElement('button', buttonHandler, { class: 'infobox__button' }, document.createTextNode('Start'))
    } else if ( gameStatus === 'after' && winner){
        content = `<p class="infobox__paragraph">Winner: <strong class="infobox__strong">${winner}</strong></p>`;
        content = createElement(
                    'p', 
                    null, 
                    { class: 'infobox__paragraph' },
                    // children
                    document.createTextNode('Winner: '),
                    createElement('strong', null, { class: 'infobox__strong' }, document.createTextNode(winner))
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