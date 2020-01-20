import {configureStore} from "@reduxjs/toolkit";
import {AppState} from "../shared/types/appState";
import {gameSlice} from "../features/game/game.slice";
import {scoreboardSlice} from "../features/scoreboard/scoreboard.slice";


export const store = configureStore<AppState>({
    reducer: {
        game: gameSlice.reducer,
        scoreboard: scoreboardSlice.reducer
    }
});