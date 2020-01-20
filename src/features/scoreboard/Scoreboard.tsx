import React from 'react';
import {useSelector} from "react-redux";
import {AppState} from "../../shared/types/appState";
import {getScoreboard} from "./scoreboard.slice";
import {ScoreboardInfo} from "./types";
import styled from "styled-components";

const Scoreboard = () => {

    const scoreboard = useSelector<AppState, ScoreboardInfo>(getScoreboard);

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