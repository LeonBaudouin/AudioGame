import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { FillRectState } from "../FillRectState";
import { RectCollisionLayer } from "../RectCollisionLayer";

export class RectCollision implements ControllerInterface {

    private collisionLayer: RectCollisionLayer
    public isPassive: boolean
    public lastState: FillRectState
    public isColliding: boolean = false
    private callback: Function

    constructor({isPassive, collisionLayer, callback} : RectCollisionConfig) {
        this.isPassive = isPassive
        this.collisionLayer = collisionLayer
        this.callback = callback
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        this.lastState = currentState
        this.collisionLayer.addController(this)
        return currentState
    }

    public Collide(isColliding: boolean, rectColliding: RectCollision) {
        this.isColliding = isColliding
        if (isColliding && this.callback) this.callback(rectColliding)
    }
}

interface RectCollisionConfig {
    callback: Function|null
    collisionLayer: RectCollisionLayer
    isPassive: boolean
}