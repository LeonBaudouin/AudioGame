import { DrawableInterface } from "./DrawableInterface";
import { GeneratorInterface } from "./GeneratorInterface";

export class BaseGenerator implements DrawableInterface {

    private generator: GeneratorInterface
    private drawables: DrawableInterface[] = []

    constructor(generator: GeneratorInterface) {
        this.generator = generator
    }

    Draw(ctx: CanvasRenderingContext2D): void {
        this.drawables.forEach(drawable => {
            drawable.Draw(ctx)
        })
    }

    Update(): void {
        const generated = this.generator.Generate()
        if (generated) this.drawables.push(generated)
        this.drawables = this.generator.Remove(this.drawables)

        this.drawables.forEach(drawable => {
            drawable.Update()
        })
    }
}
