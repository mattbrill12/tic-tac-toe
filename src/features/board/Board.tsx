import React from 'react';
import Square from "../square/Square";
import {AppState} from "../../shared/types/appState";
import {useSelector} from "react-redux";
import {getBoard} from "../game/game.slice";
import styled from "styled-components";

const renderBoard = (board:string[][]) => {
    return (
        <>
            <table>
                <thead></thead>
                <tbody>

                {board.map((row, rowIndex) => (
                    <Row className={rowIndex === 1 ? 'mid' : ''} key={rowIndex}>
                        {row.map((col,colIndex) => (
                            <Square key={colIndex} rowIndex={rowIndex} colIndex={colIndex} symbol={col}/>
                        ))}
                    </Row>
                ))}

                </tbody>
            </table>
        </>
    )
};

const Board = () => {
    const board = useSelector<AppState, string[][]>(getBoard);
    return renderBoard(board);
};

export default Board;

const Row = styled.tr`
    &.mid {
        margin-top: -7px;
        margin-bottom: -7px;
    }
`;

