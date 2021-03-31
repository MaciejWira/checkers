import TeamBoard from '../../classes/TeamBoard/TeamBoard';
import chessboardComponent from '../chessboardComponent/chessboardComponent';
import './stageComponent.scss';
import infoBox from './../infoBox/infoBox';

const stageComponent = (chessboard, stage) => {

    const teamBoardWhite = new TeamBoard('white', chessboard.status.team);
    const teamBoardBlack = new TeamBoard('black', chessboard.status.team);

    stage.innerHTML = `
            <div class="stage">
                ${teamBoardBlack.render(chessboard.status.team)}
                <div class="chessboard">
                    ${chessboardComponent(chessboard)}
                    ${infoBox(chessboard.status.game) ? infoBox(chessboard.status.game) : ''}
                </div>
                ${teamBoardWhite.render(chessboard.status.team)}
            </div>
        `;

    // click handlers
    [...document.querySelectorAll('.js-clickable')]
        .forEach( field => {
            field.addEventListener('click', () => {
                chessboard.updateStatus( 
                    parseInt(field.getAttribute('data-id')), 
                    field.getAttribute('data-action'),
                    parseInt(field.getAttribute('data-capture'))
                );
                stageComponent(chessboard, stage);
            });
        });

};

export default stageComponent;