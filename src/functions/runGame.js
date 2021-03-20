import { createStage } from './createStage';
import Chessboard from './../classes/Chessboard/Chessboard';
import chessboardComponent from '../components/chessboardComponent/chessboardComponent';
import { initialSet } from './../helpers/initialSet';

export const runGame = () => {
    createStage();
    const chessboard = new Chessboard(initialSet);
    chessboardComponent(chessboard, document.getElementById('main-stage'));
}
