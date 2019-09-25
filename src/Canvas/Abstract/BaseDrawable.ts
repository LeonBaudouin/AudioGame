import { DrawableInterface } from "./DrawableInterface";
import { RendererInterface } from "./RendererInterface";
import { ControllerInterface } from "./ControllerInterface";
import { StateObjectInterface } from "./StateObjectInterface";

export class BaseDrawable implements DrawableInterface {
    
    protected renderer : RendererInterface;
    protected controllers : ControllerInterface[];
    protected currentState : StateObjectInterface;
    protected defaultState : StateObjectInterface;

    public constructor(defaultState : StateObjectInterface, renderer: RendererInterface, controllers: ControllerInterface[] = []) {
        this.defaultState = defaultState.Clone();
        this.currentState = defaultState.Clone();
        this.renderer = renderer;
        this.controllers = controllers;
    }

    public Draw(ctx: CanvasRenderingContext2D): void {
        this.renderer.Render(this.currentState, ctx);
    }

    public Update(): void {
        this.controllers.forEach(
            controller => this.currentState = controller.Update(this.currentState, this.defaultState)
        )
    }

    public getState(): StateObjectInterface {
        return this.currentState
    }
}
