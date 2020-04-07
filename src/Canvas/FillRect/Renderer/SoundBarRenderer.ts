import { FillRectState } from "../FillRectState"
import { transformRange, Interval } from "../../../CustomTypes/Interval"

export class SoundBarRenderer {
    
    private lowerInterval : Interval
    private higherInterval : Interval
    private overallInterval : Interval
    
    
    constructor({lowerInterval, higherInterval, overallInterval} : {lowerInterval : Interval, higherInterval : Interval, overallInterval : Interval}) {
        this.lowerInterval = lowerInterval
        this.higherInterval = higherInterval
        this.overallInterval = overallInterval
    }

    Render({size, position, style}: FillRectState, ctx: CanvasRenderingContext2D): void {
        const rectInterval = {min: position.x, max: position.x + size.width}

        const firstPoint = transformRange(this.lowerInterval.min, this.overallInterval, rectInterval)
        const secondPoint = transformRange(this.lowerInterval.max, this.overallInterval, rectInterval)
        const thirdPoint = transformRange(this.higherInterval.min, this.overallInterval, rectInterval)
        const fourthPoint = transformRange(this.higherInterval.max, this.overallInterval, rectInterval)
        
        ctx.fillStyle = style
        ctx.fillRect(firstPoint, position.y, secondPoint - firstPoint, size.height)
        ctx.fillRect(thirdPoint, position.y, fourthPoint - thirdPoint, size.height)
        ctx.fillRect(position.x, position.y, size.width, size.height)
    }
}
