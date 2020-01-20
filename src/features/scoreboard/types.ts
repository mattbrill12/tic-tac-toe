export interface ScoreboardInfo {
    players:PlayerInfo[];
}

export interface PlayerInfo {
    name: string;
    record: Record;
}
export interface Record {
    wins: number;
    losses: number;
    draws: number;
}