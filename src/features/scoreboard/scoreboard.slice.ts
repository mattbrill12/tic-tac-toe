import {createSlice, PayloadAction, SliceCaseReducers, createAction} from '@reduxjs/toolkit';
import {AppState} from "../../shared/types/appState";
import {ScoreboardInfo} from "./types";

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
        winnerAnnounced: (state: ScoreboardInfo, action: PayloadAction<string>) => {
            const winner = action.payload;

            const tmpPlayers = [...state.players];


            for (let player of tmpPlayers) {
                if (player.name === winner)
                    player.record.wins++;
                else
                    player.record.losses++;
            }

            state.players = tmpPlayers;
        },
        drawAnnounced: (state: ScoreboardInfo, action: PayloadAction<null>) => {
            for(let player of state.players) {
                player.record.draws++;
            }
        }
    }
});

export const getScoreboard = (state: AppState) => state.scoreboard;
