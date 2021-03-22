import { createStage } from './createStage';
import Chessboard from './../classes/Chessboard/Chessboard';
import chessboardComponent from '../components/chessboardComponent/chessboardComponent';
import { chessboardSet } from './../classes/Chessboard/chessboardSettings';

export const runGame = () => {
    createStage();
    const chessboard = new Chessboard(chessboardSet);
    chessboardComponent(chessboard, document.getElementById('main-stage'));
}
