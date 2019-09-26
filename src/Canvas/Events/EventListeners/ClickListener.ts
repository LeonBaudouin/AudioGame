import { ListenEvent, NativeEventListener } from "./SimpleEventListener";
import { Point } from "../../../CustomTypes/Point";

export class ClickListener extends NativeEventListener {

    protected static instance: ClickListener;
    protected static value: ClickValue = {x: 0, y: 0, timestamp: 0};

    public static getInstance(): ListenEvent {
        if(ClickListener.instance == null)
            ClickListener.instance = new ClickListener()

        return ClickListener.instance;
    }

    private constructor() {
        super("click");
    }

    public getValue() {
        return ClickListener.value;
    }

    public UpdateValue(e: MouseEvent) {
        console.log(e.timeStamp)
        ClickListener.value = {x: e.clientX, y: e.clientY, timestamp: Date.now()}
    }

}

interface ClickValue extends Point {
    timestamp: number
}
