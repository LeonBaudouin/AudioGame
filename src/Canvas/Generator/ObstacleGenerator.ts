import { GeneratorInterface } from "../Abstract/GeneratorInterface"
import { DrawableInterface } from "../Abstract/DrawableInterface"
import { BaseDrawable } from "../Abstract/BaseDrawable"
import { FillRectState } from "../FillRect/FillRectState"
import { FillRectRenderer } from "../FillRect/FillRectRenderer"

export class ObstacleGenerator implements GeneratorInterface {

    private frequency: number

    constructor({frequency}: ObstacleGeneratorConfig) {
        this.frequency = frequency
    }

    public Generate(): DrawableInterface {
        if (Math.random() < this.frequency) {
            return new BaseDrawable(
                new FillRectState({
                    size: {width: 10, height: 10},
                    position: {x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight},
                    style: 'red'
                }),
                new FillRectRenderer()
            )
        }
        return null
    }

    public Remove(drawables: DrawableInterface[]) {
        if (drawables.length > 20) return drawables.slice(1)
        return drawables
    }

}

interface ObstacleGeneratorConfig {
    frequency: 0.005
}
