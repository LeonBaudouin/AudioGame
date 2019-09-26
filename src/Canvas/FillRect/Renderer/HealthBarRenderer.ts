import { RendererInterface } from "../../Abstract/RendererInterface";
import { FillRectState } from "../FillRectState";

export class HealthBarRenderer implements RendererInterface{

    private baseWidth: number

    constructor({baseWidth}: {baseWidth: number}) {
        this.baseWidth = baseWidth
    }

    Render({size, position, style}: FillRectState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = style
        ctx.fillRect(position.x, position.y, size.width, size.height)
        ctx.strokeStyle = style
        ctx.lineWidth = 2
        ctx.strokeRect(position.x, position.y, this.baseWidth, size.height)
        ctx.strokeRect(position.x - 4, position.y - 4, this.baseWidth + 8, size.height + 8)
        ctx.font = "30px Monospace";
        ctx.fillText(Math.floor(size.width / this.baseWidth * 100).toString(), position.x + this.baseWidth + 10, position.y + size.height);
    }
    

}
