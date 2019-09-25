import { GeneratorInterface } from "../Abstract/GeneratorInterface"
import { DrawableInterface } from "../Abstract/DrawableInterface"
import { BaseDrawable } from "../Abstract/BaseDrawable"
import { FillRectState } from "../FillRect/FillRectState"
import { FillRectRenderer } from "../FillRect/FillRectRenderer"
import { RectCollisionLayer } from "../FillRect/RectCollisionLayer"
import { RectCollision } from "../FillRect/Controller/RectCollision"
import { TimeMovement } from "../FillRect/Controller/TimeMovement"
import { Point } from "../../CustomTypes/Point"
import { Canvas } from "../Canvas"

export class ObstacleGenerator implements GeneratorInterface {

    private static FREQUENCY_SCROLL_RATIO = 12

    private scrollSpeed: number
    private collisionLayer: RectCollisionLayer
    private rowQty: number

    private timer: number = 0
    private lastRect: BaseDrawable

    constructor({scrollSpeed, collisionLayer, rowQty}: ObstacleGeneratorConfig) {
        this.scrollSpeed = scrollSpeed
        this.collisionLayer = collisionLayer
        this.rowQty = rowQty
        this.timer = this.getFrequency() - 1
    }

    public Generate(): DrawableInterface {
        if (this.timer >= this.getFrequency()) {
            this.timer = 1
            this.lastRect = new BaseDrawable(
                new FillRectState({
                    size: {width: this.getSize(), height: this.getSize()},
                    position: this.getPosition(),
                    style: 'red'
                }),
                new FillRectRenderer(),
                [
                    new TimeMovement({
                        movementVector: {x: 0, y: -this.scrollSpeed}
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
        this.timer++
        return null
    }

    private getFrequency(): number {
        return this.scrollSpeed * ObstacleGenerator.FREQUENCY_SCROLL_RATIO
    }

    private getPosition(): Point {
        const lastPosition = this.lastRect ? (<FillRectState>this.lastRect.getState()).position : null

        let position : Point = {x: 1, y: 1}
        do
            position.x = Math.floor(Math.random() * this.rowQty) * this.getSize()
        while(lastPosition && position.x == lastPosition.x)
        position.y = lastPosition ? lastPosition.y + this.getSize() : Canvas.getSize().height
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
