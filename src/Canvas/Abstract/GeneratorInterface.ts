import { DrawableInterface } from "./DrawableInterface";

export interface GeneratorInterface {

    Generate(): DrawableInterface
    Remove(drawables: DrawableInterface[]): DrawableInterface[]
}
