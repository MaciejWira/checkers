import { createStage } from './createStage';
import Fields from '../classes/Fields';
import Chessboard from './../classes/Chessboard/Chessboard';
import chessboardComponent from '../components/chessboardComponent/chessboardComponent';
import { initialSet } from './../helpers/initialSet';

export const runGame = () => {
    createStage();
    const fields = new Fields(initialSet);
    const chessboard = new Chessboard(fields.fields);
    chessboardComponent(chessboard, document.getElementById('main-stage'));
}
