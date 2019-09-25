import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { Player } from "../../../Player";

export class HealthBar implements ControllerInterface {

    private player: Player

    constructor({player}: HealthBarConfig) {
        this.player = player
    }

    Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        newState.size.width = defaultState.size.width * (this.player.getLife() / this.player.getMaxLife())
        return newState
    }

}

interface HealthBarConfig {
    player: Player
}