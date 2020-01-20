import {GameInfo} from "../../features/game/types";
import {ScoreboardInfo} from "../../features/scoreboard/types";

export interface AppState {
    game: GameInfo,
    scoreboard: ScoreboardInfo
}
