import { DrawableInterface } from "./DrawableInterface";
import { GeneratorInterface } from "./GeneratorInterface";
import { AbstractDrawableObject } from "./AbstractDrawableObject";

export class BaseGenerator extends AbstractDrawableObject {

    private generator: GeneratorInterface
    private drawables: DrawableInterface[] = []

    constructor(generator: GeneratorInterface, tags: string[], startPaused: boolean = false, startVisible: boolean = true) {
        super(tags, startPaused, startVisible)
        this.generator = generator
    }

    Draw(ctx: CanvasRenderingContext2D): void {
        if (this.isVisible() && this.isActive()) {
            this.drawables.forEach(drawable => {
                drawable.Draw(ctx)
            })
        }
    }

    Update(): void {
        if (!this.isPaused() && this.isActive()) {
            const generated = this.generator.Generate()
            if (generated) this.drawables.push(generated)
            this.drawables = this.generator.Remove(this.drawables)
        }
        this.drawables.forEach(drawable => {
            drawable.Update()
        })
    }
}
