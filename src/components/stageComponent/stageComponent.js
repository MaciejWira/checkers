import TeamBoard from '../../classes/TeamBoard/TeamBoard';
import chessboardComponent from '../chessboardComponent/chessboardComponent';
import './stageComponent.scss';
import infoBox from './../infoBox/infoBox';

const stageComponent = (chessboard, stage) => {

    const teamBoardWhite = new TeamBoard('white', chessboard.status.team);
    const teamBoardBlack = new TeamBoard('black', chessboard.status.team);
    const { chessboardDOM, chessboardEvents } = chessboardComponent(chessboard);
    const { infoBoxDOM, infoBoxEvents } = infoBox(chessboard);

    stage.innerHTML = `
            <div class="stage">
                ${teamBoardBlack.render(chessboard.status.team)}
                <div class="chessboard">
                    ${chessboardDOM}
                    ${infoBoxDOM ? infoBoxDOM : ''}
                </div>
                ${teamBoardWhite.render(chessboard.status.team)}
            </div>
        `;

    // event handlers
    chessboardEvents(chessboard, () => stageComponent(chessboard, stage));
    if ( infoBoxEvents ) infoBoxEvents();

};

export default stageComponent;