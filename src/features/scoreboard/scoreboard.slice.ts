import {createSlice, PayloadAction, SliceCaseReducers} from '@reduxjs/toolkit';
import {AppState} from "../../shared/types/appState";
import {PlayerInfo, ScoreboardInfo} from "./types";


export const scoreboardSlice = createSlice<ScoreboardInfo, SliceCaseReducers<ScoreboardInfo>>({
    name: 'scoreboardSlice',
    initialState: {
        players: [
            {name:'X', record:{wins:0, losses:0, draws: 0}},
            {name:'O', record:{wins:0, losses:0, draws: 0}}
        ]
    },
    reducers: {
        scoreUpdated: (state: ScoreboardInfo, actions:PayloadAction<PlayerInfo[]>) => {
            state.players = actions.payload;
        }
    }

});

export const getScoreboard = (state: AppState) => state.scoreboard;


