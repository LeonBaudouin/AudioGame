import { ListenEvent, NativeEventListener, SimpleEventListener } from "./SimpleEventListener";
import { Point } from "../../../CustomTypes/Point";

export class ClickListener extends SimpleEventListener {

    protected static instance: ClickListener;
    protected static value: ClickValue = {x: 0, y: 0, timestamp: 0};
    protected callbacks: Function[] = []

    public static getInstance(): ListenEvent {
        if(ClickListener.instance == null)
            ClickListener.instance = new ClickListener()

        return ClickListener.instance;
    }

    constructor() {
        super()
        window.addEventListener('click', (e) => this.onEvent(e))
    }

    protected onEvent(e: MouseEvent) {
        this.UpdateValue(e)
        this.callbacks.forEach(cb => cb(e))
    }

    public getValue() {
        return ClickListener.value;
    }

    public UpdateValue(e: MouseEvent) {
        ClickListener.value = {x: e.clientX, y: e.clientY, timestamp: Date.now()}
    }

    public addCallack(f: Function) {
        this.callbacks.push(f)
    }

}

interface ClickValue extends Point {
    timestamp: number
}
