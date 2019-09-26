import { GeneratorInterface } from "../Abstract/GeneratorInterface"
import { DrawableInterface } from "../Abstract/DrawableInterface"
import { BaseDrawable } from "../Abstract/BaseDrawable"
import { FillRectState } from "../FillRect/FillRectState"
import { RectCollisionLayer } from "../FillRect/RectCollisionLayer"
import { RectCollision } from "../FillRect/Controller/RectCollision"
import { TimeMovement } from "../FillRect/Controller/TimeMovement"
import { Point } from "../../CustomTypes/Point"
import { Canvas } from "../Canvas"
import { ImageRenderer, Fit } from "../FillRect/Renderer/ImageRenderer"
import { makeImage } from "../CanvasSetup"

export class ObstacleGenerator implements GeneratorInterface {

    private scrollSpeed: number
    private collisionLayer: RectCollisionLayer
    private rowQty: number

    private lastRect: BaseDrawable

    constructor({scrollSpeed, collisionLayer, rowQty}: ObstacleGeneratorConfig) {
        this.scrollSpeed = scrollSpeed
        this.collisionLayer = collisionLayer
        this.rowQty = rowQty
    }

    public Generate(): DrawableInterface {
        if (this.lastRect == null || (this.lastRect != null && (<FillRectState>this.lastRect.getState()).position.y > -10)) {
            this.lastRect = new BaseDrawable(
                new FillRectState({
                    size: {width: this.getSize(), height: this.getSize()},
                    position: this.getPosition(),
                    style: '#ff7575b0'
                }),
                new ImageRenderer({
                    image: makeImage('./assets/asteroid.png'),
                    fit: Fit.stretch,
                    scale: 1.3
                }),
                [
                    new TimeMovement({
                        movementVector: {x: 0, y: this.scrollSpeed}
                    }),
                    new RectCollision({
                        isPassive: true,
                        collisionLayer: this.collisionLayer,
                        callback: null
                    })
                ]
            )
            return this.lastRect
        }
        return null
    }

    private getPosition(): Point {
        const lastPosition = this.lastRect ? (<FillRectState>this.lastRect.getState()).position : null

        let position : Point = {x: 1, y: 1}
        do
            position.x = Math.floor(Math.random() * this.rowQty) * this.getSize()
        while(lastPosition && position.x == lastPosition.x)

        position.y = lastPosition ? lastPosition.y - this.getSize() : - this.getSize()

        return position
    }

    private getSize(): number {
        return Canvas.getSize().width / this.rowQty
    }

    public Remove(drawables: DrawableInterface[]) {
        if (drawables.length > 20) return drawables.slice(1)
        return drawables
    }

}

interface ObstacleGeneratorConfig {
    scrollSpeed: number,
    collisionLayer: RectCollisionLayer,
    rowQty: number
}
