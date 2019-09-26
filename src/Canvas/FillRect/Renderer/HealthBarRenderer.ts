import { FillRectState } from "../FillRectState";
import { FillRectRenderer } from "./FillRectRenderer";

export class HealthBarRenderer extends FillRectRenderer {

    private baseWidth: number

    constructor({baseWidth}: {baseWidth: number}) {
        super()
        this.baseWidth = baseWidth
    }

    Render(state: FillRectState, ctx: CanvasRenderingContext2D): void {
        const {size, position, style} = state
        super.Render(state, ctx)
        
        ctx.strokeStyle = style
        ctx.lineWidth = 2
        ctx.strokeRect(position.x, position.y, this.baseWidth, size.height)
        ctx.strokeRect(position.x - 4, position.y - 4, this.baseWidth + 8, size.height + 8)
        ctx.font = "30px Monospace";
        ctx.textAlign = 'left';
        ctx.fillText(Math.floor(size.width / this.baseWidth * 100).toString(), position.x + this.baseWidth + 10, position.y + size.height);
    }
    

}
