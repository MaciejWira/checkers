import './infoBox.scss';

const infoBox = (chessboard, winner = '') => {

    const gameStatus = chessboard.status.game;

    if ( gameStatus === 'on' ) return {};

    let content = null;

    if ( gameStatus === 'before' ){
        content = `<button class="infobox__button js-start-game">Start</button>`;
    } else if ( gameStatus === 'after' && winner){
        content = `<p class="infobox__paragraph">Winner: <strong class="infobox__strong">${winner}</strong></p>`;
    }

    const infoBoxDOM = `<div class="infobox">
                            <div class="infobox__content">
                                ${content}
                            </div>
                        </div>`;
    const infoBoxEvents = () => {
        document.querySelector('.js-start-game')?.addEventListener('click', () => {
            chessboard.status = {
                game: 'on',
                team: 'white'
            }
        });
    };

    return { infoBoxDOM, infoBoxEvents };

};

export default infoBox;