import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { MouseMoveListener } from "../../Events/EventListeners/MouseMoveListener";
import { ListenEvent } from "../../Events/EventListeners/SimpleEventListener";

export class ShakeHover implements ControllerInterface {

    private mouseMove: ListenEvent
    private hoverTime: number
    private amplitude: number
    private frequency: number

    constructor({amplitude, frequency}: {amplitude: number, frequency: number}) {
        this.mouseMove = MouseMoveListener.getInstance()
        this.hoverTime = 0
        this.amplitude = amplitude
        this.frequency = frequency
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const mousePosition = this.mouseMove.getValue()
        const newState = currentState.Clone()

        if (mousePosition.x > currentState.position.x && mousePosition.x < currentState.position.x + currentState.size.width
         && mousePosition.y > currentState.position.y && mousePosition.y < currentState.position.y + currentState.size.height) {
             this.hoverTime++
        } else {
            this.hoverTime = 0
        }

        newState.position.y = defaultState.position.y + Math.sin(this.hoverTime * this.frequency / 60) * this.amplitude
        return newState
    }
    

}