import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {GameInfo, PiecePlayed} from "./types";
import {AppState} from "../../shared/types/appState";



export const gameSlice = createSlice<GameInfo, SliceCaseReducers<GameInfo>>({
    name: 'gameSlice',
    initialState: {
        isXTurn: true,
        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ]
    },
    reducers: {
        gameRefreshed: (state: GameInfo, actions:PayloadAction<GameInfo>) => actions.payload,
        squarePlayed: (state: GameInfo, actions:PayloadAction<PiecePlayed>) => {

            const winner = checkHasWinner(state.board);
            if (state.board[actions.payload.rowIndex][actions.payload.colIndex] !== '' || winner) return;


            state.board[actions.payload.rowIndex][actions.payload.colIndex] = actions.payload.symbol;



            state.isXTurn = !state.isXTurn;
        }
    }

});

export const getBoard = (state: AppState) => state.game.board;
export const isXTurn = (state: AppState) => state.game.isXTurn;


function checkHasWinner(board:string[][]):string {

    for(let i = 0; i < board.length; i++) {
        // rows
        if (board[i][0] !== '' &&
            board[i][0] === board[i][1] &&
            board[i][0] === board[i][2]) return board[i][0];

        // cols
        if (board[0][i] !== '' &&
            board[0][i] === board[1][i] &&
            board[0][i] === board[2][i]) return board[0][i];

        // top left diag
        if (board[0][0] !== '' &&
            board[0][0] === board[1][1] &&
            board[0][0] === board[2][2]) return board[0][0];

        // bot left diag
        if (board[2][0] !== '' &&
            board[2][0] === board[1][1] &&
            board[2][0] === board[0][2]) return board[0][0];
    }

    return '';

}