export interface GameInfo {
    isXTurn: boolean;
    board: string[][];
}

export interface PiecePlayed {
    rowIndex: number;
    colIndex: number;
    symbol: string;
}