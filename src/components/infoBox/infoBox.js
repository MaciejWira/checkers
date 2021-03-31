import './infoBox.scss';

const infoBox = (gameStatus, winner = '') => {

    if ( gameStatus === 'on' ) return;

    let content = null;

    if ( gameStatus === 'before' ){
        content = `<button class="infobox__button js-start-game">Start</button>`;
        // document.querySelector('.js-start-game')?.addEventListener('click', () => {
        //     console.log('test');
        // });
    } else if ( gameStatus === 'after' && winner){
        content = `<p class="infobox__paragraph">Winner: <strong class="infobox__strong">${winner}</strong></p>`;
    }

    return `
            <div class="infobox">
                <div class="infobox__content">
                    ${content}
                </div>
            </div>
        `

};

export default infoBox;