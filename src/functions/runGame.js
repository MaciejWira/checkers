import { createStage } from './createStage';
import Chessboard from './../classes/Chessboard/Chessboard';
import { chessboardSet } from './../classes/Chessboard/chessboardSettings';
import stageComponent from './../components/stageComponent/stageComponent';

export const runGame = () => {
    createStage();
    const chessboard = new Chessboard(chessboardSet);
    stageComponent(chessboard, document.getElementById('main-stage'));
}
