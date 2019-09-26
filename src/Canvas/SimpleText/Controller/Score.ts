import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { SimpleTextState } from "../SimpleTextState";
import { Game } from "../../../Game";

export class Score implements ControllerInterface {

    Update(currentState: SimpleTextState, defaultState: SimpleTextState): SimpleTextState {
        const newState = currentState.Clone()
        newState.content = defaultState.content + Math.floor(Game.getGameDuration() / 10)
        return newState
    }

}