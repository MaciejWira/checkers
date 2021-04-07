import createElement from 'Utils/createElement';
import styles from './InfoBox.scss';
const { container, content, button, strong, paragraph } = styles;

const InfoBox = chessboard => {

    const gameStatus = chessboard.status.game;

    if ( gameStatus === 'on' ) return null;

    let _content = null;

    if ( gameStatus === 'before' ){
        const buttonHandler = el => {
            el.addEventListener('click', () => {
                chessboard.startGame();
                chessboard.updateStatus();
            });
        }
        _content = createElement('button', buttonHandler, { class: button }, document.createTextNode('Start'))
    } else if ( gameStatus === 'finished' ){

        const buttonHandler = el => {
            el.addEventListener('click', () => {
                chessboard.stage.newGame();
            });
        };

        const core = chessboard.status.winner ? [ 
            document.createTextNode('Winner: '),
            createElement('strong', null, { class: strong }, document.createTextNode(chessboard.status.winner))
        ] : [
            document.createTextNode('Draw'),
        ];

        _content = createElement(
                    'div', 
                    null, 
                    {},
                    // children
                    createElement('p', null, { class: paragraph }, document.createTextNode('End of game!')),
                    ...core,
                    createElement('br'),
                    createElement('button', buttonHandler, { class: button }, document.createTextNode('OK'))
                )
    }

    return createElement(
                'div', 
                null, 
                { class: container },
                createElement('div', null, { class: content }, _content)
            );

};

export default InfoBox;