import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { Point } from "../../../CustomTypes/Point";

export class PositionConstraint implements ControllerInterface {

    upperLeft: Point
    lowerRight: Point

    constructor({upperLeft, lowerRight}: PositionConstraintConfig) {
        this.upperLeft = upperLeft
        this.lowerRight = lowerRight
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const newState = currentState.Clone()

        if (currentState.position.x < this.upperLeft.x) newState.position.x = this.upperLeft.x
        if (currentState.position.y < this.upperLeft.y) newState.position.y = this.upperLeft.y
        if (currentState.position.x + currentState.size.width > this.lowerRight.x) newState.position.x = this.lowerRight.x - currentState.size.width
        if (currentState.position.y + currentState.size.height > this.lowerRight.y) newState.position.y = this.lowerRight.y - currentState.size.height

        return newState
    }

}

interface PositionConstraintConfig {
    upperLeft: Point
    lowerRight: Point
}
