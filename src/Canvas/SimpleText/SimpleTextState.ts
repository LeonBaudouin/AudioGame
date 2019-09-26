import { StateObjectInterface } from "../Abstract/StateObjectInterface";
import { Point } from "../../CustomTypes/Point";

export class SimpleTextState implements StateObjectInterface, SimpleTextStateConfig {

    public content: string
    public textSize: number
    public textUnit: string
    public font: string
    public textAlign: CanvasTextAlign
    public textColor: string
    public position: Point

    constructor({content, textSize, textUnit, font, textAlign, textColor, position}: SimpleTextStateConfig) {
        this.content = content
        this.textSize = textSize
        this.textUnit = textUnit
        this.font = font
        this.textAlign = textAlign
        this.textColor = textColor
        this.position = {...position}
    }

    public Clone(): SimpleTextState {
        return new SimpleTextState(this)
    }

}

interface SimpleTextStateConfig {
    content: string,
    textSize: number,
    textUnit: string,
    font: string,
    textAlign: CanvasTextAlign,
    textColor: string,
    position: Point
}