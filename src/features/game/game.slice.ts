import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {GameInfo, PiecePlayed} from "./types";
import {AppState} from "../../shared/types/appState";
import {scoreboardSlice} from "../scoreboard/scoreboard.slice";


export const gameSlice = createSlice<GameInfo, SliceCaseReducers<GameInfo>>({
    name: 'gameSlice',
    initialState: {
        isXTurn: true,
        board: [
            ['','',''],
            ['','',''],
            ['','','']
        ],
        status: '',
        winner: null,
        draw: null
    },
    reducers: {
        gameRestored: (state: GameInfo, action:PayloadAction<GameInfo>) => state = action.payload,
        gameRefreshed: (state: GameInfo, action:PayloadAction<string[][]>) => {
            state.board = action.payload;
            state.isXTurn = true;
            state.status = '';
            state.draw = null;
            state.winner = null;
        },
        squarePlayed: (state: GameInfo, action:PayloadAction<PiecePlayed>) => {

            // exit if non empty square played, or game is over
            if (state.board[action.payload.rowIndex][action.payload.colIndex] !== '' || state.status) return;

            state.board[action.payload.rowIndex][action.payload.colIndex] = action.payload.symbol;

            const winner = checkHasWinner(state.board);
            if (winner) {
                state.winner = winner;
                state.status = `${winner} wins!`;
                return;
            }

            const draw = isDraw(state.board);
            if (draw) {
                state.draw = draw;
                state.status = 'Draw!';
                return;
            }

            state.isXTurn = !state.isXTurn;
        }
    },
    extraReducers: builder => {
        builder.addCase(scoreboardSlice.actions.winnerAnnounced, (state, action) => {state.winner = null});
        builder.addCase(scoreboardSlice.actions.drawAnnounced, (state, action) => {state.draw = null});
    }

});

//
//  selectors
//
export const getBoard = (state: AppState) => state.game.board;
export const isXTurn = (state: AppState) => state.game.isXTurn;
export const getGameStatus = (state:AppState) => state.game.status;
export const getGameInfo = (state: AppState) => state.game;

//
//  helpers
//
const checkHasWinner = (board:string[][]):string => {

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

};

const isDraw = (board:string[][]):boolean => {
    for(let i = 0; i < board.length; i++) {
        for(let j = 0; j < board.length; j++) {
            if (board[i][j] === '') return false;
        }
    }
    return true;
};