import React from 'react';
import styled from "styled-components";
import {useDispatch, useSelector} from "react-redux";
import {gameSlice, isXTurn} from "../game/game.slice";
import {PiecePlayed} from "../game/types";
import {AppState} from "../../shared/types/appState";

const applyStyles = (piecePlayed:PiecePlayed) => {
    let style = '';
    if (piecePlayed.rowIndex === 1) style = 'horiz';
    if (piecePlayed.colIndex === 1) style += ' vert';
    if (piecePlayed.symbol === 'E') style += ' empty';
    return style;
};

const Square = (props:PiecePlayed) => {
    const {symbol, rowIndex, colIndex} = props;

    const dispatch = useDispatch();
    const _isXTurn = useSelector<AppState, boolean>(isXTurn);
    const handleClick = () => {
        dispatch(gameSlice.actions.squarePlayed({
            rowIndex,
            colIndex,
            symbol: _isXTurn ? 'X': 'O'
        }));
    };

    return (
        <Box onClick={handleClick}
             className={applyStyles(props)}>{symbol}</Box>
    );
};

export default Square;

const Box = styled.td`
    text-align: center;
    display: inline-block;
    padding: 25px;
    font-weight: bold;
    font-size: 32px;
    width: 100px;
    height: 100px;
    border-bottom: none;
    &.vert {
        border-left: 2px solid black;
        border-right: 2px solid black;
    }
    &.horiz {
        border-top: 2px solid black;
        border-bottom: 2px solid black;
    }
    
    &.empty {
        color: white;
    }
    cursor: pointer;
`;

