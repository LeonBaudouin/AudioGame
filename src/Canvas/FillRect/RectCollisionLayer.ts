import { FillRectState } from "./FillRectState";
import { RectCollision } from "./Controller/RectCollision";
import { GlobalControlerInterface } from "../Abstract/GlobalControlerInterface";

export class RectCollisionLayer implements GlobalControlerInterface {
    
    private controllers: RectCollision[] = []

    public addController(controller: RectCollision): void {
        this.controllers.push(controller)
    }

    public getColliding(): RectCollision[] {
        return this.controllers.filter(c => c.isColliding)
    }

    public Update(): void {
        this.controllers.forEach((controller) => {
            if (!controller.isPassive) {
                this.controllers.forEach((otherController) => {
                    if (otherController == controller) return
                    const colliding = this.Collide(controller.lastState, otherController.lastState)
                    controller.Collide(colliding, otherController)
                    otherController.Collide(colliding, controller)
                })
            }
        })
        this.controllers = []
    }

    private Collide(rect1: FillRectState, rect2: FillRectState) {
        return rect1.position.x < rect2.position.x + rect2.size.width 
            && rect1.position.x + rect1.size.width > rect2.position.x
            && rect1.position.y < rect2.position.y + rect2.size.height 
            && rect1.position.y + rect1.size.height > rect2.position.y
    }

}