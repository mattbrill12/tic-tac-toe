import {createSlice, PayloadAction, SliceCaseReducers, createAction} from '@reduxjs/toolkit';
import {AppState} from "../../shared/types/appState";
import {ScoreboardInfo} from "./types";
import {gameSlice} from "../game/game.slice";
import {GameInfo} from "../game/types";


export const scoreboardSlice = createSlice<ScoreboardInfo, SliceCaseReducers<ScoreboardInfo>>({
    name: 'scoreboardSlice',
    initialState: {
        players: [
            {name:'X', record:{wins:0, losses:0, draws: 0}},
            {name:'O', record:{wins:0, losses:0, draws: 0}}
        ]
    },
    reducers: {
        scoreboardRestored: (state: ScoreboardInfo, action:PayloadAction<ScoreboardInfo>) => state = action.payload,
    },
    extraReducers: builder => {
        builder.addCase(gameSlice.actions.squarePlayed, (state, action) => {

            console.log(action);
            // TODO update scoreboard
            // state.players[0].record.wins++;

        });
    }
});

export const getScoreboard = (state: AppState) => state.scoreboard;


const scoreboardUpdated = createAction<GameInfo>('scoreboardUpdated');