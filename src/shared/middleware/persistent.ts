import {Action} from "@reduxjs/toolkit";

export const GAME_STATE = 'GAME_STATE';
export const SCOREBOARD_STATE = 'SCOREBOARD_STATE';

export const persistent = ({getState}: any) => (next: any) => (action: Action) => {
    next(action);

    if (action.type !== '@@INIT' &&
        action.type !== 'scoreboardSlice/scoreboardRestored' &&
        action.type !== 'gameslice/gameRestored') {
        window.localStorage.setItem(GAME_STATE, JSON.stringify(getState().game));
        window.localStorage.setItem(SCOREBOARD_STATE, JSON.stringify(getState().scoreboard));
    }
};
