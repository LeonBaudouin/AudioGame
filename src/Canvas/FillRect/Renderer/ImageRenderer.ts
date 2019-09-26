import { RendererInterface } from "../../Abstract/RendererInterface";
import { FillRectState } from "../FillRectState";
import { Size } from "../../../CustomTypes/Size";

export class ImageRenderer implements RendererInterface {

    protected image: HTMLImageElement
    protected fit: (size: Size) => Size
    protected scale: number

    constructor({image, fit, scale} : {image: HTMLImageElement, fit: Fit, scale: number}) {
        this.image = image
        this.scale = scale
        switch (fit) {
            case Fit.inWidth:
                this.fit = this.fitInWidth
                break;
            case Fit.inHeight:
                throw 'Fit in height no implemented yet'
            case Fit.stretch:
                this.fit = (size) => size
                break;
            case Fit.conserve:
                this.fit = (size) => { return {width: this.image.width, height: this.image.height}}
                break;
            default:
                break;
        }
    }

    public Render(state: FillRectState, ctx: CanvasRenderingContext2D) {
        const {width, height} = this.fit(state.size)
        const center = {x: state.position.x + state.size.width/2, y: state.position.y + state.size.height/2}
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(this.image, center.x - width*this.scale/2, center.y - height*this.scale/2, width*this.scale, height*this.scale)
        // ctx.strokeStyle = 'blue'
        // ctx.strokeRect(state.position.x, state.position.y, state.size.width, state.size.height)
    }

    private fitInWidth(size: Size): Size {
        return {
            width: size.width,
            height: (this.image.height / this.image.width) / (size.height / size.width) * size.height
        }
    }
}

export enum Fit {
    inWidth = 'inWidth',
    inHeight = 'inHeight',
    conserve = 'conserve',
    stretch = 'stretch'
}
