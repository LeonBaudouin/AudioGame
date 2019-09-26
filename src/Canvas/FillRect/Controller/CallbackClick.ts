import { ControllerInterface } from "../../Abstract/ControllerInterface";
import { ClickListener } from "../../Events/EventListeners/ClickListener";
import { ListenEvent } from "../../Events/EventListeners/SimpleEventListener";
import { FillRectState } from "../FillRectState";

export class CallBackClick implements ControllerInterface {
    
    private clickListener: ListenEvent
    private callback: Function
    private lastClickTimestamp: number = 0

    constructor({callback}: {callback: Function}) {
        this.clickListener = ClickListener.getInstance()
        this.callback = callback
    }

    public Update(currentState: FillRectState, defaultState: FillRectState): FillRectState {
        const mousePosition = this.clickListener.getValue()

        if (mousePosition.x > currentState.position.x && mousePosition.x < currentState.position.x + currentState.size.width
         && mousePosition.y > currentState.position.y && mousePosition.y < currentState.position.y + currentState.size.height) {
             if(mousePosition.timestamp !== this.lastClickTimestamp) {
                this.callback()
             }
             this.lastClickTimestamp = mousePosition.timestamp
        }

        return currentState
    }
}