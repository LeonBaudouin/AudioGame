import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { Player } from "../../../Player";
import { EventProvider } from "../../Events/EventProvider";

export class HealthBar implements ControllerInterface {

    private player: Player
    private damaged: boolean

    constructor({player}: HealthBarConfig) {
        this.player = player
        EventProvider.listenTo('player damaged', () => {this.damaged = true})
    }

    Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        newState.size.width = defaultState.size.width * (this.player.getLife() / this.player.getMaxLife())
        if (this.damaged) {
            newState.style = '#df111199'
            this.damaged = false
        } else {
            newState.style = defaultState.style 
        }
        return newState
    }

}

interface HealthBarConfig {
    player: Player
}
