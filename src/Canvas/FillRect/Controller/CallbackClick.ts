import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { ClickListener } from "../../Events/EventListeners/ClickListener";
import { ListenEvent } from "../../Events/EventListeners/SimpleEventListener";
import { FillRectState } from "../FillRectState";
import { Point } from "../../../CustomTypes/Point";

export class CallBackClick implements ControllerInterface {
    
    private callback: Function
    private lastClickPoint: Point = {x: Infinity, y: Infinity}
    private callbackWasAdded: boolean = false

    constructor({callback}: {callback: Function}) {
        this.callback = callback
    }

    public onClick(e: MouseEvent) {
        this.lastClickPoint = {x: e.x, y: e.y}
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        if (!this.callbackWasAdded) {
            (<ClickListener>ClickListener.getInstance()).addCallack(this.onClick.bind(this))
            this.callbackWasAdded = true
        } 

        if (this.lastClickPoint.x > currentState.position.x && this.lastClickPoint.x < currentState.position.x + currentState.size.width
         && this.lastClickPoint.y > currentState.position.y && this.lastClickPoint.y < currentState.position.y + currentState.size.height) {
            this.callback()
        }

        this.lastClickPoint = {x: Infinity, y: Infinity}

        return currentState
    }
}
