import { RendererInterface } from "../../Abstract/RendererInterface";
import { SimpleTextState } from "../SimpleTextState";

export class SimpleTextRenderer implements RendererInterface {
    Render({content, textSize, textUnit, font, textAlign, textColor, position}: SimpleTextState, ctx: CanvasRenderingContext2D) : void {
        ctx.fillStyle = textColor;
        ctx.font = textSize + textUnit + ' ' + font
        ctx.textAlign = textAlign
        ctx.fillText(content, position.x, position.y)
    }
}