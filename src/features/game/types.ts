export interface GameInfo {
    isXTurn: boolean;
    board: string[][];
    status: string;
    winner: string|null;
    draw: boolean|null;
}

export interface PiecePlayed {
    rowIndex: number;
    colIndex: number;
    symbol: string;
}