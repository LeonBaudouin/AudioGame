import { RendererInterface } from "../../Abstract/RendererInterface";
import { FillRectState } from "../FillRectState";

export class FillRectRenderer implements RendererInterface {

    Render({size, position, style}: FillRectState, ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = style
        ctx.fillRect(position.x, position.y, size.width, size.height)
    }
    
}
