import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { Point } from "../../../CustomTypes/Point";

export class TimeMovement implements ControllerInterface {

    private movementVector: Point 

    constructor({movementVector}: TimeMovementConfig) {
        this.movementVector = movementVector
    }

    Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()
        newState.position = { x: currentState.position.x + this.movementVector.x, y: currentState.position.y + this.movementVector.y }
        return newState
    }
    
}

interface TimeMovementConfig {
    movementVector: Point
}