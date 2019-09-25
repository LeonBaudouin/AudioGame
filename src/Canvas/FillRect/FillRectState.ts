import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { Style } from "../../CustomTypes/Style";
import { Size } from "../../CustomTypes/Size";
import { Point } from "../../CustomTypes/Point";

export class FillRectState implements StateObjectInterface, FillRectStateConfig {

    size: Size
    position: Point
    style: Style

    constructor({size, position, style}: FillRectStateConfig) {
        this.size = {...size}
        this.position = {...position}
        this.style = style
    }

    Clone(): FillRectState {
        return new FillRectState(this)
    }
    
}

interface FillRectStateConfig {
    position: Point
    size: Size
    style: Style
}
