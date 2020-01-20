import React from 'react';
import Board from "../board/Board";
import styled from 'styled-components';
import {useSelector} from "react-redux";
import {AppState} from "../../shared/types/appState";
import {isXTurn} from "./game.slice";

const Game = () => {

    const _isXTurn = useSelector<AppState, boolean>(isXTurn);
    return (
        <GameContainer>
            <h2>Player Turn: {_isXTurn ? 'X' : 'O'}</h2>
            <Board/>
        </GameContainer>
    );
};

export default Game;

const GameContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

