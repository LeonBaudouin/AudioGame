import { RendererInterface } from "../../Abstract/RendererInterface";
import { FillRectState } from "../FillRectState";

export class ButtonRenderer implements RendererInterface {

    private content: string

    constructor({content}: {content: string}) {
        this.content = content
    }

    Render({position, size, style}: FillRectState, ctx: CanvasRenderingContext2D) : void {
        ctx.strokeStyle = style
        ctx.fillStyle = style
        ctx.lineWidth = 2
        ctx.strokeRect(position.x - 4, position.y - 4, size.width + 8, size.height + 8)
        ctx.font = '30px Monospace'
        ctx.textAlign = 'center'
        ctx.fillText(this.content, position.x + size.width/2, position.y + size.height/1.5)
    }

}