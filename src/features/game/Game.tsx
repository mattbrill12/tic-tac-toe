import React, {useEffect} from 'react';
import Board from "../board/Board";
import styled from 'styled-components';
import {useDispatch, useSelector} from "react-redux";
import {AppState} from "../../shared/types/appState";
import {gameSlice, isXTurn, getGameStatus} from "./game.slice";
import {GAME_STATE} from "../../shared/middleware/persistent";

const Game = () => {

    const _isXTurn = useSelector<AppState, boolean>(isXTurn);
    const gameStatus = useSelector<AppState, string>(getGameStatus);
    const dispatch = useDispatch();

    useEffect(() => {
        try {
            const storedGameState = localStorage.getItem(GAME_STATE);
            if (storedGameState) {
                dispatch(gameSlice.actions.gameRestored(JSON.parse(storedGameState)));
            }
        } finally {}
    }, []);


    return (
        <GameContainer>
            {gameStatus ? <h2>{gameStatus}</h2> : <h2>Player Turn: {_isXTurn ? 'X' : 'O'}</h2>}
            <Board/>
            <button onClick={() => dispatch(gameSlice.actions.gameRefreshed([
                ['','',''],
                ['','',''],
                ['','','']
            ]))}>
                Restart Game
            </button>
        </GameContainer>
    );
};

export default Game;

const GameContainer = styled.div`
    padding: 20px;
    text-align: center;
`;

