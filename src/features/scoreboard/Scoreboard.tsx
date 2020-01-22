import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../shared/types/appState";
import {getScoreboard, scoreboardSlice} from "./scoreboard.slice";
import {ScoreboardInfo} from "./types";
import {GameInfo} from "../../features/game/types";
import styled from "styled-components";
import {SCOREBOARD_STATE} from "../../shared/middleware/persistent";
import {getGameInfo} from "../game/game.slice";

const Scoreboard = () => {

    const scoreboard = useSelector<AppState, ScoreboardInfo>(getScoreboard);
    const gameInfo = useSelector<AppState, GameInfo>(getGameInfo);
    const dispatch = useDispatch();


    let dataLoaded = false;

    useEffect(() => {

        if (gameInfo.winner) dispatch(scoreboardSlice.actions.winnerAnnounced(gameInfo.winner));
        if (gameInfo.draw) dispatch(scoreboardSlice.actions.drawAnnounced(null));

    }, [gameInfo]);

    useEffect(() => {

        try {
            const storedScoreboardState = localStorage.getItem(SCOREBOARD_STATE);
            if (storedScoreboardState) {
                dispatch(scoreboardSlice.actions.scoreboardRestored(JSON.parse(storedScoreboardState)));
            }
        } finally {}
    }, []);

    return (
        <table>
            <thead>
            <tr>
                <TableCell>Player</TableCell>
                <TableCell>Wins</TableCell>
                <TableCell>Losses</TableCell>
                <TableCell>Draws</TableCell>
            </tr>
            </thead>
            <tbody>
            {scoreboard.players.map(player => (
                <tr key={player.name}>
                    <TableCell><strong>{player.name}</strong></TableCell>
                    <TableCell>{player.record.wins}</TableCell>
                    <TableCell>{player.record.losses}</TableCell>
                    <TableCell>{player.record.draws}</TableCell>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default Scoreboard;

const TableCell = styled.td`
    text-align: center;  
`;